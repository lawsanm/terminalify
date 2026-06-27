export type ThemeId =
  | 'ubuntu'
  | 'dark'
  | 'solarized-dark'
  | 'dracula'
  | 'light';

export interface Theme {
  id: ThemeId;
  name: string;
  background: string;
  foreground: string;
  titleBar: string;
  titleBarText: string;
  user: string;
  host: string;
  path: string;
  promptChar: string;
  /** highlight colors for command syntax */
  cmdName: string;
  cmdFlag: string;
  cmdString: string;
  cmdArg: string;
  /** drop-shadow / chrome accent for the window outline */
  windowShadow: string;
}

export interface PromptSettings {
  username: string;
  hostname: string;
  directory: string;
}

export interface DisplayOptions {
  windowTitle: string;
  showChrome: boolean;
  padding: number;
  fontSize: number;
}

export interface AppState {
  content: string;
  prompt: PromptSettings;
  themeId: ThemeId;
  display: DisplayOptions;
}

export const DEFAULT_STATE: AppState = {
  content: [
    '$ sudo apt update',
    'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease',
    'Reading package lists... Done',
    'Building dependency tree... Done',
    '$ git clone https://github.com/example/repo.git',
    "Cloning into 'repo'...",
    'remote: Enumerating objects: 1284, done.',
    '$ cd repo && ls -la',
    'total 24',
    'drwxr-xr-x  6 user user 4096 Mar  5 09:12 .',
    'drwxr-xr-x  3 user user 4096 Mar  5 09:11 ..',
    '-rw-r--r--  1 user user  142 Mar  5 09:12 README.md',
    '$ echo "Welcome to Ubuntu!"',
    'Welcome to Ubuntu!',
  ].join('\n'),
  prompt: {
    username: 'user',
    hostname: 'ubuntu',
    directory: '~',
  },
  themeId: 'ubuntu',
  display: {
    windowTitle: 'user@ubuntu: ~',
    showChrome: true,
    padding: 24,
    fontSize: 14,
  },
};
