import { useState } from 'react';

interface Props {
  onCopyImage: () => Promise<void>;
  onDownloadPng: () => Promise<void>;
  onCopyHtml: () => Promise<void>;
  onCopyShareLink: () => Promise<void>;
}

type Status = { kind: 'idle' } | { kind: 'busy'; label: string } | { kind: 'done'; label: string };

export function Toolbar({ onCopyImage, onDownloadPng, onCopyHtml, onCopyShareLink }: Props) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const run = async (label: string, fn: () => Promise<void>) => {
    setStatus({ kind: 'busy', label });
    try {
      await fn();
      setStatus({ kind: 'done', label });
      window.setTimeout(() => setStatus({ kind: 'idle' }), 1500);
    } catch (err) {
      console.error(err);
      setStatus({ kind: 'done', label: 'Failed' });
      window.setTimeout(() => setStatus({ kind: 'idle' }), 1500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={() => run('Copied image', onCopyImage)}>Copy as image</Button>
      <Button onClick={() => run('Downloaded', onDownloadPng)} variant="primary">
        Download PNG
      </Button>
      <Button onClick={() => run('Copied HTML', onCopyHtml)}>Copy HTML</Button>
      <Button onClick={() => run('Link copied', onCopyShareLink)}>Copy share link</Button>
      {status.kind !== 'idle' && (
        <span className="text-xs text-zinc-400 ml-1">
          {status.kind === 'busy' ? `${status.label}…` : status.label}
        </span>
      )}
    </div>
  );
}

function Button({
  onClick,
  children,
  variant = 'default',
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
}) {
  const base =
    'inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors border';
  const styles =
    variant === 'primary'
      ? 'bg-ubuntu-orange text-white border-ubuntu-orange hover:bg-[#cf4519]'
      : 'bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700';
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
