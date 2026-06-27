interface Props {
  value: string;
  onChange: (next: string) => void;
}

export function Editor({ value, onChange }: Props) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
          Editor
        </label>
        <span className="text-[11px] text-zinc-500">
          lines starting with <code className="text-zinc-300">$ </code> are commands
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 min-h-0 w-full resize-none rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 p-3 font-mono text-sm leading-relaxed outline-none focus:border-ubuntu-orange focus:ring-1 focus:ring-ubuntu-orange/40"
        placeholder={'$ echo "hello"\nhello'}
      />
    </div>
  );
}
