import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMemoryFacts, setMemoryFacts, addMemoryFact, extractFactAuto, MEMORY_KEY } from './memory';

global.localStorage = {
  store: {} as Record<string, string>,
  getItem(key: string) { return this.store[key] || null; },
  setItem(key: string, value: string) { this.store[key] = value; },
  removeItem(key: string) { delete this.store[key]; },
  clear() { this.store = {}; }
} as any;

beforeEach(() => {
  localStorage.clear();
});

describe('memory utils', () => {
  it('getMemoryFacts returns empty array if nothing stored', () => {
    expect(getMemoryFacts()).toEqual([]);
  });

  it('setMemoryFacts and getMemoryFacts store and retrieve facts', () => {
    setMemoryFacts(['foo', 'bar']);
    expect(getMemoryFacts()).toEqual(['foo', 'bar']);
  });

  it('addMemoryFact adds a new fact and prevents duplicates', () => {
    addMemoryFact('foo');
    addMemoryFact('bar');
    addMemoryFact('foo');
    expect(getMemoryFacts()).toEqual(['foo', 'bar']);
  });

  it('extractFactAuto extracts facts from various patterns', () => {
    expect(extractFactAuto('my name is John')).toBe('my name is John');
    expect(extractFactAuto('I am a developer')).toBe('I am a developer');
    expect(extractFactAuto('I live in Paris')).toBe('I live in Paris');
    expect(extractFactAuto('my birthday is July 14')).toBe('my birthday is July 14');
    expect(extractFactAuto('my favorite color is blue')).toBe('my favorite color is blue');
    expect(extractFactAuto('random text')).toBeNull();
  });

  it('facts persist in localStorage', () => {
    addMemoryFact('foo');
    expect(localStorage.getItem(MEMORY_KEY)).toContain('foo');
  });

  it('handles malformed localStorage data gracefully', () => {
    localStorage.setItem(MEMORY_KEY, 'not-json');
    expect(getMemoryFacts()).toEqual([]);
  });
}); 