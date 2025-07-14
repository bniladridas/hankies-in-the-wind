import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-5xl mx-auto px-16">
        <div className="flex items-center justify-between">
          <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.2s_forwards] hover:opacity-30 transition-opacity duration-500">
            2025
          </div>
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.4s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-4 text-center sm:text-left">
          @bniladridas · i write in my personal macbook air · i am a member of the mlx community in hugging face and contributor at google gemini (part-time on github) · i recently became a perplexity ai business fellow
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.6s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-2 text-center sm:text-left">
          how does this ai work? when the gemini quota ends, you can add your own api key to continue using google's gemini model.
        </div>
        <div className="text-gray-600 font-light tracking-wide text-xs mt-2 text-center sm:text-left">
          This site is not affiliated with Google or DeepMind. Gemini is a product of Google.
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.8s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-2 text-center sm:text-left">
          animation inspired by “what if it was weightless” from https://www.thewayofcode.com/ and anthropic artifacts.
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_4.0s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-2 text-center sm:text-left">
          my accounts on the internet can be found with the username @bniladridas. page created and corrected on 7/14/2025.
        </div>
        <div className="text-gray-600 font-light tracking-wide text-xs mt-4 text-center sm:text-left">
          i wrote ml codes
          <br />in your ml code, you’d include the api key in your scripts (e.g., python with the gemini api sdk) to authenticate requests. example:
          <pre className="bg-black rounded p-2 mt-2 overflow-x-auto"><code>
            <span style={{color: '#2563eb'}}>import</span> <span style={{color: '#fff'}}>google.generativeai</span> <span style={{color: '#2563eb'}}>as</span> <span style={{color: '#fff'}}>genai</span>{'\n'}
            <span style={{color: '#fff'}}>genai</span>.<span style={{color: '#22c55e'}}>configure</span>(api_key=<span style={{color: '#f59e42'}}>&quot;your_api_key&quot;</span>){'\n'}
            <span style={{color: '#fff'}}>model</span> = <span style={{color: '#fff'}}>genai</span>.<span style={{color: '#22c55e'}}>generativemodel</span>(<span style={{color: '#f59e42'}}>&quot;gemini-2.0-flash&quot;</span>){'\n'}
            <span style={{color: '#fff'}}>response</span> = <span style={{color: '#fff'}}>model</span>.<span style={{color: '#22c55e'}}>generate_content</span>(<span style={{color: '#f59e42'}}>&quot;write a python function for sorting.&quot;</span>){'\n'}
            <span style={{color: '#22c55e'}}>print</span>(<span style={{color: '#fff'}}>response</span>.text)
          </code></pre>
        </div>
      </div>
    </footer>
  );
};

export default Footer;