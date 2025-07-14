# memory module

## design overview

the memory module implements a lightweight, persistent key-value store for conversational facts, optimized for use in llm-driven chat applications. it leverages the browser’s `localstorage` for persistence and uses regular expression–based pattern matching for fact extraction from user input.

## gemini integration

this memory module is purpose-built to work with the gemini llm api. gemini, like most llms, does not persist conversational state between requests. to enable context-aware, multi-turn conversations, the application retrieves relevant user facts from the memory module and prepends them to each prompt sent to gemini. this ensures that gemini receives the necessary context to generate coherent, personalized responses, simulating persistent memory at the application level.

- **why:** gemini is stateless by design; all context must be provided in each prompt.
- **how:** the chat interface calls the memory module to gather facts, which are then included in the prompt string sent to gemini.
- **result:** the user experiences a more natural, contextually aware conversation, even though gemini itself does not remember previous interactions.

## data structures

- **fact store:**
  - an array of strings, each representing a user-specific fact.
  - storage: serialized as json in `localstorage` under a fixed key (`chatbox_memory_facts`).

## algorithms

- **deduplication:**
  - when adding a new fact, the module checks for existence to prevent duplicates (o(n) lookup).
- **fact extraction:**
  - uses regular expressions to identify and extract facts from user utterances, supporting patterns like:
    - "my name is ..."
    - "i am ..."
    - "i live in ..."
    - "my birthday is ..."
    - "my favorite ... is ..."
    - "i like ..."
    - "i have ..."
    - "i work at ..."
    - "my hobby is ..."
  - fallback: any sentence starting with "my" or "i am" is also stored as a fact.

## api

- `getmemoryfacts(): string[]`
  - returns all stored facts.
- `setmemoryfacts(facts: string[]): void`
  - overwrites the stored facts.
- `addmemoryfact(fact: string): void`
  - adds a new fact if not already present.
- `extractfactauto(message: string): string | null`
  - extracts a fact from a user message using pattern matching and fallback.

## integration

- the module is stateless except for its interaction with `localstorage`.
- it is called by the chat interface to update and retrieve conversational context, which is then included in prompts to the gemini llm.
- this approach enables context-aware, multi-turn conversations with gemini, which does not persist memory between requests.

## testing

- the test suite (`memory.test.ts`) covers:
  - fact storage and retrieval
  - deduplication
  - fact extraction accuracy
  - persistence and error handling 

## troubleshooting and testing

- fact extraction heuristic:
  - the memory module only stores facts if they match certain patterns (e.g., "my name is ...", "i live in ...", "my birthday is ...", "my favorite ... is ...", "i like ...", etc.).
  - if your message does not match these patterns, it will not be stored.
  - example:
    - "my name is john" → stored
    - "i like pizza" → stored
    - "i have a dog" → stored
    - "hello there" → not stored

- relevant fact filtering:
  - only facts that share a keyword with your current message are included in the prompt to gemini.
  - if you ask about something unrelated to a stored fact, it won’t be included in the prompt, so gemini won’t “remember” it.

- session/localstorage issues:
  - if you clear your browser storage or use incognito mode, stored facts may be lost.

- gemini’s limitations:
  - even if a fact is included in the prompt, gemini may not always use it as expected, especially if the prompt is ambiguous or the fact is not clearly relevant.

### how to test if memory works

- try a supported pattern:
  - type: my name is alice
  - then ask: what is my name?
  - the ai should respond with “alice”.

- check localstorage:
  - open your browser’s dev tools → application → local storage → look for `chatbox_memory_facts`.

- try a direct pattern:
  - type: my favorite color is blue
  - then ask: what is my favorite color? 