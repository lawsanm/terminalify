import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toBlob, toPng } from 'html-to-image';
import type { AppState } from './types';
import { DEFAULT_STATE } from './types';
import { TerminalPreview } from './components/TerminalPreview';
import { Editor } from './components/Editor';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import {
  buildShareUrl,
  readStateFromUrl,
  writeStateToUrl,
} from './utils/url-state';
import { useDebounced } from './utils/useDebounced';

export default function App() {
  const [state, setState] = useState<AppState>(() => readStateFromUrl() ?? DEFAULT_STATE);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Debounce URL writes so each keystroke doesn't thrash history.replaceState.
  const debouncedState = useDebounced(state, 350);
  useEffect(() => {
    writeStateToUrl(debouncedState);
  }, [debouncedState]);

  const handleCopyImage = useCallback(async () => {
    const node = previewRef.current;
    if (!node) return;
    const blob = await toBlob(node, { pixelRatio: 2, cacheBust: true });
    if (!blob) throw new Error('Failed to render image');
    // ClipboardItem PNG support is broad in modern browsers.
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  }, []);

  const handleDownloadPng = useCallback(async () => {
    const node = previewRef.current;
    if (!node) return;
    const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'terminal.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  const handleCopyHtml = useCallback(async () => {
    const node = previewRef.current;
    if (!node) return;
    // Grab the rendered terminal markup directly. Inline styles already carry
    // all colors/fonts so it stays self-contained when pasted elsewhere.
    await navigator.clipboard.writeText(node.outerHTML);
  }, []);

  const handleCopyShareLink = useCallback(async () => {
    await navigator.clipboard.writeText(buildShareUrl(state));
  }, [state]);

  const previewArea = useMemo(
    () => (
      <div className="flex items-center justify-center w-full min-h-full overflow-auto p-4 bg-[radial-gradient(circle_at_30%_20%,#2a2a2e,#0d0d10)]">
        <TerminalPreview ref={previewRef} state={state} />
      </div>
    ),
    [state],
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="border-b border-zinc-800 px-5 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-ubuntu-orange flex items-center justify-center font-bold text-white">
            U
          </div>
          <h1 className="font-semibold text-sm sm:text-base">
            Ubuntu Terminal Snippet Generator
          </h1>
        </div>
        <div className="ml-auto">
          <Toolbar
            onCopyImage={handleCopyImage}
            onDownloadPng={handleDownloadPng}
            onCopyHtml={handleCopyHtml}
            onCopyShareLink={handleCopyShareLink}
          />
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)_minmax(0,1fr)] gap-4 p-4 min-h-0">
        <Sidebar state={state} onChange={setState} />
        <div className="min-h-[40vh] lg:min-h-0">
          <Editor value={state.content} onChange={(content) => setState({ ...state, content })} />
        </div>
        <div className="min-h-[40vh] lg:min-h-0 rounded-lg border border-zinc-800 overflow-hidden">
          {previewArea}
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-5 py-2 text-xs text-zinc-500">
        Lines starting with <code className="text-zinc-300">$ </code> render as commands; other
        lines render as output. State is encoded in the URL — share the link to share the snippet.
      </footer>
    </div>
  );
}
