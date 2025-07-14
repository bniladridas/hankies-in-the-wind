export const MEMORY_KEY = 'chatbox_memory_facts';

export function getMemoryFacts(): string[] {
  try {
    const data = localStorage.getItem(MEMORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setMemoryFacts(facts: string[]): void {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(facts));
}

export function addMemoryFact(fact: string): void {
  const facts = getMemoryFacts();
  if (!facts.includes(fact)) {
    facts.push(fact);
    setMemoryFacts(facts);
  }
}

export function extractFactAuto(message: string): string | null {
  const patterns = [
    /my name is ([^.,!\n]+)/i,
    /i am ([^.,!\n]+)/i,
    /i live in ([^.,!\n]+)/i,
    /my birthday is ([^.,!\n]+)/i,
    /my favorite ([^ ]+) is ([^.,!\n]+)/i
  ];
  for (const pat of patterns) {
    const match = message.match(pat);
    if (match) {
      return message.trim();
    }
  }
  return null;
} 