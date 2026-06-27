import type { Theme } from '../types';
import { KNOWN_COMMANDS } from '../commands';

export interface Token {
  text: string;
  color: string;
}

type TokenKind = 'cmd' | 'flag' | 'string' | 'arg' | 'space';

interface RawToken {
  text: string;
  kind: TokenKind;
}

/**
 * Tokenize a single command-line string. Preserves whitespace as separate tokens
 * so the renderer can keep the original spacing.
 *
 * Why: doing this with a state machine (instead of regex split) lets us handle
 * quoted strings that contain spaces without losing them or double-tokenising.
 */
function tokenize(line: string): RawToken[] {
  const tokens: RawToken[] = [];
  let i = 0;
  let isFirstWord = true;

  while (i < line.length) {
    const ch = line[i];

    if (ch === ' ' || ch === '\t') {
      let j = i;
      while (j < line.length && (line[j] === ' ' || line[j] === '\t')) j++;
      tokens.push({ text: line.slice(i, j), kind: 'space' });
      i = j;
      continue;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\' && j + 1 < line.length) j += 2;
        else j++;
      }
      if (j < line.length) j++; // include closing quote
      tokens.push({ text: line.slice(i, j), kind: 'string' });
      i = j;
      isFirstWord = false;
      continue;
    }

    let j = i;
    while (
      j < line.length &&
      line[j] !== ' ' &&
      line[j] !== '\t' &&
      line[j] !== '"' &&
      line[j] !== "'"
    ) {
      j++;
    }
    const word = line.slice(i, j);

    let kind: TokenKind;
    if (isFirstWord) {
      kind = 'cmd';
      isFirstWord = false;
    } else if (word.startsWith('-')) {
      kind = 'flag';
    } else {
      kind = 'arg';
    }

    tokens.push({ text: word, kind });
    i = j;
  }

  return tokens;
}

/**
 * Highlight a command line. The first word gets cmdName only if it's a
 * recognised command — otherwise it falls back to cmdArg so we don't
 * mis-color arbitrary input.
 */
export function highlightCommand(line: string, theme: Theme): Token[] {
  const raw = tokenize(line);
  return raw.map((tok) => {
    switch (tok.kind) {
      case 'space':
        return { text: tok.text, color: theme.foreground };
      case 'cmd': {
        const base = tok.text.split('/').pop() ?? tok.text;
        const known = KNOWN_COMMANDS.has(base);
        return { text: tok.text, color: known ? theme.cmdName : theme.cmdArg };
      }
      case 'flag':
        return { text: tok.text, color: theme.cmdFlag };
      case 'string':
        return { text: tok.text, color: theme.cmdString };
      case 'arg':
        return { text: tok.text, color: theme.cmdArg };
    }
  });
}
