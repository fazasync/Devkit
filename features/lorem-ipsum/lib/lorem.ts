const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
];

export function generateLoremWords(count: number): string {
  const safe = Math.max(1, Math.min(1000, Math.floor(count)));
  const result: string[] = [];
  for (let i = 0; i < safe; i++) {
    result.push(WORDS[i % WORDS.length]);
  }
  return result.join(" ");
}

export function generateLoremSentences(count: number): string {
  const safe = Math.max(1, Math.min(100, Math.floor(count)));
  const sentences: string[] = [];
  for (let i = 0; i < safe; i++) {
    const len = 8 + (i % 6);
    const words: string[] = [];
    for (let j = 0; j < len; j++) {
      words.push(WORDS[(i * 7 + j) % WORDS.length]);
    }
    const sentence = words.join(" ");
    sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
  }
  return sentences.join(" ");
}

export function generateLoremParagraphs(count: number): string {
  const safe = Math.max(1, Math.min(20, Math.floor(count)));
  const paragraphs: string[] = [];
  for (let i = 0; i < safe; i++) {
    paragraphs.push(generateLoremSentences(4 + (i % 3)));
  }
  return paragraphs.join("\n\n");
}