import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { AppState } from '../types';
import { DEFAULT_STATE } from '../types';

const HASH_KEY = 's';

/** Pack state through lz-string so the URL stays manageable for long snippets. */
export function encodeState(state: AppState): string {
  return compressToEncodedURIComponent(JSON.stringify(state));
}

export function decodeState(encoded: string): AppState | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const parsed = JSON.parse(json) as Partial<AppState>;
    return mergeWithDefaults(parsed);
  } catch {
    return null;
  }
}

function mergeWithDefaults(partial: Partial<AppState>): AppState {
  return {
    content: typeof partial.content === 'string' ? partial.content : DEFAULT_STATE.content,
    prompt: { ...DEFAULT_STATE.prompt, ...(partial.prompt ?? {}) },
    themeId: partial.themeId ?? DEFAULT_STATE.themeId,
    display: { ...DEFAULT_STATE.display, ...(partial.display ?? {}) },
  };
}

export function readStateFromUrl(): AppState | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const raw = params.get(HASH_KEY);
  if (!raw) return null;
  return decodeState(raw);
}

export function writeStateToUrl(state: AppState) {
  if (typeof window === 'undefined') return;
  const encoded = encodeState(state);
  const newHash = `${HASH_KEY}=${encoded}`;
  // Use replaceState so typing doesn't pollute browser history.
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${newHash}`);
}

export function buildShareUrl(state: AppState): string {
  const encoded = encodeState(state);
  const { origin, pathname, search } = window.location;
  return `${origin}${pathname}${search}#${HASH_KEY}=${encoded}`;
}
