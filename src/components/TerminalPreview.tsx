import { forwardRef, useMemo } from 'react';
import type { AppState, Theme } from '../types';
import { getTheme } from '../themes';
import { WindowChrome } from './WindowChrome';
import { PromptLine } from './PromptLine';
import { highlightCommand } from '../utils/highlight';

interface Props {
  state: AppState;
}

interface ParsedLine {
  isCommand: boolean;
  text: string;
}

/**
 * Lines starting with `$ ` (or `$` then EOL) are commands; everything else is output.
 * The `$ ` marker is stripped before rendering — the prompt provides its own `$`.
 */
function parseLines(content: string): ParsedLine[] {
  return content.split('\n').map((raw) => {
    if (raw === '$' || raw.startsWith('$ ')) {
      return { isCommand: true, text: raw === '$' ? '' : raw.slice(2) };
    }
    return { isCommand: false, text: raw };
  });
}

export const TerminalPreview = forwardRef<HTMLDivElement, Props>(function TerminalPreview(
  { state },
  ref,
) {
  const theme = getTheme(state.themeId);
  const lines = useMemo(() => parseLines(state.content), [state.content]);

  return (
    <div
      ref={ref}
      className="inline-block"
      style={{
        background: 'transparent',
        // Outer padding gives the screenshot some breathing room when exported.
        padding: 32,
      }}
    >
      <div
        style={{
          background: theme.background,
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: `0 20px 50px ${theme.windowShadow}, 0 0 0 1px rgba(0,0,0,0.2)`,
          minWidth: 480,
        }}
      >
        {state.display.showChrome && (
          <WindowChrome theme={theme} title={state.display.windowTitle} />
        )}
        <TerminalBody theme={theme} lines={lines} state={state} />
      </div>
    </div>
  );
});

function TerminalBody({
  theme,
  lines,
  state,
}: {
  theme: Theme;
  lines: ParsedLine[];
  state: AppState;
}) {
  return (
    <div
      className="font-mono"
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: state.display.padding,
        fontSize: state.display.fontSize,
        lineHeight: 1.45,
        whiteSpace: 'pre',
        fontFamily: '"Ubuntu Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      {lines.map((line, idx) => (
        <div key={idx} style={{ minHeight: '1.45em' }}>
          {line.isCommand ? (
            <>
              <PromptLine theme={theme} prompt={state.prompt} />
              <CommandText line={line.text} theme={theme} />
            </>
          ) : (
            <span>{line.text || ' '}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function CommandText({ line, theme }: { line: string; theme: Theme }) {
  if (!line) return null;
  const tokens = highlightCommand(line, theme);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: tok.color }}>
          {tok.text}
        </span>
      ))}
    </>
  );
}
