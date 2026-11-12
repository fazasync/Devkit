export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export interface RegexResult {
  matches: RegexMatch[];
  error: string | null;
}

export function runRegex(
  pattern: string,
  flags: string,
  text: string,
): RegexResult {
  if (pattern.length === 0) {
    return { matches: [], error: null };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
  } catch (error) {
    return {
      matches: [],
      error: error instanceof Error ? error.message : "Invalid regular expression.",
    };
  }

  const matches: RegexMatch[] = [];
  let guard = 0;
  let result: RegExpExecArray | null;
  while ((result = regex.exec(text)) !== null) {
    matches.push({
      match: result[0],
      index: result.index,
      groups: result.slice(1),
    });
    if (result[0].length === 0) {
      regex.lastIndex++;
    }
    guard++;
    if (guard > 10000) break;
  }

  return { matches, error: null };
}

export const AVAILABLE_FLAGS = ["g", "i", "m", "s", "u", "y"] as const;