import type { Theme } from '../types';

interface Props {
  theme: Theme;
  title: string;
}

/** Ubuntu / GNOME terminal title bar. Buttons live on the RIGHT (GNOME convention). */
export function WindowChrome({ theme, title }: Props) {
  return (
    <div
      className="flex items-center px-3 select-none"
      style={{
        background: theme.titleBar,
        color: theme.titleBarText,
        height: 32,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        fontFamily: 'Ubuntu, system-ui, sans-serif',
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {/* Spacer that mirrors button area so title stays visually centered */}
      <div style={{ width: 76 }} />
      <div className="flex-1 text-center truncate" style={{ letterSpacing: 0.2 }}>
        {title}
      </div>
      <div className="flex items-center gap-2" style={{ width: 76, justifyContent: 'flex-end' }}>
        <WindowButton kind="minimize" />
        <WindowButton kind="maximize" />
        <WindowButton kind="close" />
      </div>
    </div>
  );
}

function WindowButton({ kind }: { kind: 'minimize' | 'maximize' | 'close' }) {
  const bg = kind === 'close' ? '#E0E0E0' : '#5C5B57';
  const fg = kind === 'close' ? '#3C3B37' : '#D8D8D6';
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: 18,
        height: 18,
        borderRadius: 999,
        background: bg,
        color: fg,
        fontSize: 10,
        lineHeight: 1,
      }}
    >
      <Glyph kind={kind} color={fg} />
    </div>
  );
}

function Glyph({ kind, color }: { kind: 'minimize' | 'maximize' | 'close'; color: string }) {
  const stroke = { stroke: color, strokeWidth: 1.4, fill: 'none', strokeLinecap: 'round' as const };
  if (kind === 'minimize') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10">
        <line x1="2" y1="5.5" x2="8" y2="5.5" {...stroke} />
      </svg>
    );
  }
  if (kind === 'maximize') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10">
        <rect x="2" y="2" width="6" height="6" rx="0.5" {...stroke} />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" {...stroke} />
      <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" {...stroke} />
    </svg>
  );
}
