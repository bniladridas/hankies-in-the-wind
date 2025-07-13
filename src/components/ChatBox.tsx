import React, { useState, useRef, useEffect } from 'react';
import { ResponseStream } from './ResponseStream';
import { generateResponse } from '../services/gemini';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showHint, setShowHint] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('chatbox_hint_shown');
    }
    return true;
  });
  const [showAsk, setShowAsk] = useState(true);
  const hasUserApiKey = typeof window !== 'undefined' && !!localStorage.getItem('gemini_api_key');

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (showHint) {
      const timeout = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('chatbox_hint_shown', '1');
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [showHint]);

  useEffect(() => {
    if (!isOpen && showAsk) {
      const timeout = setTimeout(() => setShowAsk(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, showAsk]);

  const addMessage = (text: string, isUser: boolean) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    if (text === 'Error occurred') {
      setShowApiKeyInput(true);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, true);
    setIsLoading(true);
    setStreamingResponse('');
    try {
      const responseStream = await generateResponse(userMessage);
      let fullResponse = '';
      for await (const chunk of responseStream) {
        fullResponse += chunk;
        setStreamingResponse(fullResponse);
      }
      addMessage(fullResponse, false);
      setStreamingResponse('');
    } catch (error) {
      addMessage('Error occurred', false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleApiKeySave = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('gemini_api_key', apiKeyInput.trim());
      setShowApiKeyInput(false);
      setApiKeyInput('');
    }
  };

  const handleApiKeyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyInput(e.target.value);
  };

  // Click outside to close
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowApiKeyInput(false);
        setApiKeyInput('');
      }
    }
    function handleTouchOutside(event: TouchEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowApiKeyInput(false);
        setApiKeyInput('');
      }
    }
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setShowApiKeyInput(false);
        setApiKeyInput('');
      }
    }
    function handlePopState() {
      if (isOpen) {
        setIsOpen(false);
        setShowApiKeyInput(false);
        setApiKeyInput('');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleTouchOutside);
      document.addEventListener('keydown', handleEsc);
      window.history.pushState({ chatbox: true }, '');
      window.addEventListener('popstate', handlePopState);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
      document.removeEventListener('keydown', handleEsc);
      window.removeEventListener('popstate', handlePopState);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
      document.removeEventListener('keydown', handleEsc);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen]);

  return (
    <>
      {/* Minimal trigger: just an underscore */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-1">
          <div className="text-xs text-gray-500 font-light select-none opacity-0 animate-[fadeIn_0.7s_ease-out_0.2s_forwards] mb-1">google ai</div>
          <div
            className={
              `cursor-pointer select-none font-light px-2 py-1 transition-all duration-300 ` +
              (showAsk
                ? 'text-emerald-400 text-base'
                : 'text-gray-400 text-2xl')
            }
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowAsk(true)}
            onFocus={() => setShowAsk(true)}
            onMouseLeave={() => setShowAsk(false)}
            tabIndex={0}
          >
            {showAsk ? 'Ask anything' : '_'}
          </div>
        </div>
      )}
      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" style={{backdropFilter: 'blur(2px)'}}>
          <div ref={modalRef} className="w-full h-full max-w-full max-h-full flex flex-col justify-end sm:justify-center items-center relative">
            {/* ESC visual hint and Remove API key */}
            <div className="absolute top-2 right-4 flex flex-col items-end gap-1 z-10">
              <div className="text-xs text-gray-500 font-light select-none opacity-0 animate-[fadeIn_0.7s_ease-out_0.2s_forwards]">esc</div>
              {hasUserApiKey && (
                <button
                  onClick={() => {
                    localStorage.removeItem('gemini_api_key');
                    setApiKeyInput('');
                    setShowApiKeyInput(false);
                  }}
                  className="text-xs text-gray-500 hover:text-emerald-400 font-light bg-transparent border-none px-0 py-0 underline cursor-pointer mt-1"
                  type="button"
                >
                  key
                </button>
              )}
            </div>
            <div className="w-full sm:w-[420px] h-full sm:h-[80vh] flex flex-col justify-end mx-auto">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-0 pt-8 pb-2 sm:px-0 sm:pt-8 sm:pb-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.isUser
                        ? 'flex justify-end'
                        : 'flex justify-start'
                    }
                  >
                    <div
                      className={
                        'whitespace-pre-line text-base sm:text-base font-light tracking-wide text-gray-100'
                      }
                      style={{
                        textAlign: message.isUser ? 'right' : 'left',
                        margin: '0.25rem 0',
                        maxWidth: '90%',
                        background: 'none',
                        boxShadow: 'none',
                        border: 'none',
                        padding: 0
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {streamingResponse && (
                  <div className="flex justify-start">
                    <div className="whitespace-pre-line text-base sm:text-base font-light tracking-wide text-gray-100" style={{margin: '0.25rem 0', maxWidth: '90%', background: 'none', boxShadow: 'none', border: 'none', padding: 0}}>
                      <ResponseStream
                        textStream={streamingResponse}
                        mode="fade"
                        fadeDuration={1200}
                        segmentDelay={100}
                        className="text-base font-light tracking-wide"
                      />
                    </div>
                  </div>
                )}
                {/* API Key Input on Error */}
                {showApiKeyInput && (
                  <div className="flex flex-col items-start gap-1 mt-3">
                    <div className="text-xs text-gray-500 mb-1">Provide Gemini API key:</div>
                    <div className="flex w-full gap-1">
                      <input
                        type="text"
                        value={apiKeyInput}
                        onChange={handleApiKeyInputChange}
                        placeholder="Paste API key"
                        className="flex-1 bg-transparent text-gray-200 border-b border-gray-700 px-1 py-1 text-xs focus:outline-none focus:border-emerald-500"
                        autoFocus
                      />
                      <button
                        onClick={handleApiKeySave}
                        className="px-2 py-1 text-emerald-500 hover:text-emerald-400 text-xs font-light bg-transparent border-none"
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                    {typeof window !== 'undefined' && localStorage.getItem('gemini_api_key') && (
                      <button
                        onClick={() => {
                          localStorage.removeItem('gemini_api_key');
                          setApiKeyInput('');
                          setShowApiKeyInput(false);
                        }}
                        className="mt-1 text-xs text-gray-500 hover:text-emerald-400 font-light bg-transparent border-none px-0 py-0 underline cursor-pointer"
                        type="button"
                      >
                        Remove API key
                      </button>
                    )}
                  </div>
                )}
              </div>
              {/* Input */}
              <form
                className="w-full flex items-center gap-2 px-0 py-4 sm:px-0 sm:py-4"
                onSubmit={e => { e.preventDefault(); handleSubmit(); }}
                autoComplete="off"
                style={{ border: 'none', background: 'none' }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none outline-none text-base font-light tracking-wide text-gray-200 placeholder-gray-500 px-0 py-2"
                  autoFocus={isOpen}
                  disabled={isLoading}
                  style={{ boxShadow: 'none' }}
                />
                {input.trim() && !isLoading && (
                  <button
                    type="submit"
                    className="text-2xl text-gray-400 hover:text-emerald-400 font-light px-2 bg-transparent border-none outline-none"
                    style={{ lineHeight: 1 }}
                  >
                    &rarr;
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;