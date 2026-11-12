export type DiffLineType = "same" | "added" | "removed";

export interface DiffLine {
  type: DiffLineType;
  line: string;
}

export function diffLines(a: string, b: string): DiffLine[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const m = aLines.length;
  const n = bLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (aLines[i] === bLines[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (aLines[i] === bLines[j]) {
      result.push({ type: "same", line: aLines[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: "removed", line: aLines[i] });
      i++;
    } else {
      result.push({ type: "added", line: bLines[j] });
      j++;
    }
  }
  while (i < m) {
    result.push({ type: "removed", line: aLines[i] });
    i++;
  }
  while (j < n) {
    result.push({ type: "added", line: bLines[j] });
    j++;
  }

  return result;
}