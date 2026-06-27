import type { AppState, ThemeId } from '../types';
import { themeList } from '../themes';

interface Props {
  state: AppState;
  onChange: (next: AppState) => void;
}

export function Sidebar({ state, onChange }: Props) {
  const update = (patch: Partial<AppState>) => onChange({ ...state, ...patch });

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-5 text-sm">
      <Section title="Theme">
        <select
          value={state.themeId}
          onChange={(e) => update({ themeId: e.target.value as ThemeId })}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 px-2 py-1.5"
        >
          {themeList.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Prompt">
        <LabeledInput
          label="Username"
          value={state.prompt.username}
          onChange={(v) =>
            update({ prompt: { ...state.prompt, username: v } })
          }
        />
        <LabeledInput
          label="Hostname"
          value={state.prompt.hostname}
          onChange={(v) =>
            update({ prompt: { ...state.prompt, hostname: v } })
          }
        />
        <LabeledInput
          label="Directory"
          value={state.prompt.directory}
          onChange={(v) =>
            update({ prompt: { ...state.prompt, directory: v } })
          }
        />
      </Section>

      <Section title="Window">
        <LabeledInput
          label="Title"
          value={state.display.windowTitle}
          onChange={(v) =>
            update({ display: { ...state.display, windowTitle: v } })
          }
        />
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={state.display.showChrome}
            onChange={(e) =>
              update({
                display: { ...state.display, showChrome: e.target.checked },
              })
            }
          />
          <span className="text-zinc-300">Show title bar &amp; buttons</span>
        </label>
      </Section>

      <Section title="Layout">
        <RangeInput
          label={`Padding (${state.display.padding}px)`}
          min={0}
          max={64}
          step={2}
          value={state.display.padding}
          onChange={(v) =>
            update({ display: { ...state.display, padding: v } })
          }
        />
        <RangeInput
          label={`Font size (${state.display.fontSize}px)`}
          min={10}
          max={24}
          step={1}
          value={state.display.fontSize}
          onChange={(v) =>
            update({ display: { ...state.display, fontSize: v } })
          }
        />
      </Section>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] text-zinc-500 mb-1">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 text-zinc-100 px-2 py-1.5 text-sm outline-none focus:border-ubuntu-orange focus:ring-1 focus:ring-ubuntu-orange/40"
      />
    </label>
  );
}

function RangeInput({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] text-zinc-500 mb-1">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ubuntu-orange"
      />
    </label>
  );
}
