# Ubuntu Terminal Snippet Generator

A client-side web app for turning text into a polished Ubuntu (GNOME Terminal) screenshot — drop it into docs, slides, or blog posts. Inspired by ray.so and carbon.now.sh, but styled specifically for the Ubuntu look.

## Stack

React + Vite + TypeScript + Tailwind CSS. No backend.

## Getting started

```bash
npm install
npm run dev
```

Vite will print a local URL (default `http://localhost:5173`). Open it and start editing.

To produce a static build:

```bash
npm run build
npm run preview
```

## How it works

- **Editor (left)**: paste or type any text. Lines that start with `$ ` are rendered as commands (with prompt + syntax highlighting). Everything else renders as command output.
- **Preview (right)**: the terminal window updates live.
- **Sidebar**: pick a theme, configure the prompt (`user@host:dir`), set the window title, toggle the title bar, and adjust padding / font size.
- **Toolbar**: copy as image, download a 2x PNG, copy the rendered HTML, or copy a shareable URL.
- **Shareable URLs**: the full app state is `lz-string`-compressed and put in the URL hash. Open someone's link and you get their exact snippet back.

## Adding a new theme

Themes live in [`src/themes/index.ts`](src/themes/index.ts). Add an entry to the `themes` record (and the corresponding id to the `ThemeId` union in `src/types.ts`) — it will appear in the picker automatically.

```ts
'my-theme': {
  id: 'my-theme',
  name: 'My Theme',
  background: '#101010',
  foreground: '#EEEEEE',
  titleBar: '#202020',
  titleBarText: '#DDDDDD',
  user: '#7BD88F',
  host: '#7BD88F',
  path: '#5FA8FF',
  promptChar: '#EEEEEE',
  cmdName: '#7BD88F',
  cmdFlag: '#E6C547',
  cmdString: '#E08F58',
  cmdArg: '#DDDDDD',
  windowShadow: 'rgba(0,0,0,0.5)',
},
```

## Recognising more commands

Command-name highlighting is driven by a simple allow-list in [`src/commands/index.ts`](src/commands/index.ts). Add tokens to `KNOWN_COMMANDS` and they'll be colored as commands.

## Project layout

```
src/
  App.tsx                 ← top-level layout, debounced URL sync, export handlers
  types.ts                ← shared types + DEFAULT_STATE
  themes/index.ts         ← theme registry
  commands/index.ts       ← known-command allow-list
  utils/
    highlight.ts          ← command-line tokenizer + highlighter
    url-state.ts          ← lz-string encode/decode
    useDebounced.ts
  components/
    TerminalPreview.tsx   ← the rendered window (export target)
    WindowChrome.tsx      ← title bar + GNOME-style buttons
    PromptLine.tsx        ← user@host:dir$
    Editor.tsx
    Sidebar.tsx
    Toolbar.tsx
```

## Notes

- The Ubuntu Mono font is loaded from Google Fonts in `index.html`.
- `html-to-image` runs at `pixelRatio: 2` so screenshots stay crisp.
- The lines-starting-with-`$ ` convention keeps the editor stupid-simple. To mark a blank prompt, write a single `$` on its own line.
