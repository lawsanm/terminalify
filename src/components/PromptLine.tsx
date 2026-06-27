import type { PromptSettings, Theme } from '../types';

interface Props {
  theme: Theme;
  prompt: PromptSettings;
}

/** Renders `user@host:dir$ ` with the standard Ubuntu coloring. */
export function PromptLine({ theme, prompt }: Props) {
  return (
    <span aria-hidden>
      <span style={{ color: theme.user, fontWeight: 700 }}>
        {prompt.username}@{prompt.hostname}
      </span>
      <span style={{ color: theme.foreground }}>:</span>
      <span style={{ color: theme.path, fontWeight: 700 }}>{prompt.directory}</span>
      <span style={{ color: theme.promptChar }}>{'$ '}</span>
    </span>
  );
}
