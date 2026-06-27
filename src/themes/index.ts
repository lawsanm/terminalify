import type { Theme, ThemeId } from '../types';

/**
 * Theme registry. Add a new entry here to expose it in the picker.
 * Keep colors in hex so they serialize cleanly to the URL and html-to-image.
 */
export const themes: Record<ThemeId, Theme> = {
  ubuntu: {
    id: 'ubuntu',
    name: 'Ubuntu',
    background: '#300A24',
    foreground: '#EEEEEC',
    titleBar: '#3C3B37',
    titleBarText: '#D8D8D6',
    user: '#8AE234',
    host: '#8AE234',
    path: '#729FCF',
    promptChar: '#EEEEEC',
    cmdName: '#8AE234',
    cmdFlag: '#FCE94F',
    cmdString: '#E9AD0C',
    cmdArg: '#D3D7CF',
    windowShadow: 'rgba(0,0,0,0.55)',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    background: '#1E1E1E',
    foreground: '#E5E5E5',
    titleBar: '#2D2D2D',
    titleBarText: '#CCCCCC',
    user: '#6FC36F',
    host: '#6FC36F',
    path: '#5FA8FF',
    promptChar: '#E5E5E5',
    cmdName: '#6FC36F',
    cmdFlag: '#E6C547',
    cmdString: '#E08F58',
    cmdArg: '#D4D4D4',
    windowShadow: 'rgba(0,0,0,0.5)',
  },
  'solarized-dark': {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    background: '#002B36',
    foreground: '#93A1A1',
    titleBar: '#073642',
    titleBarText: '#93A1A1',
    user: '#859900',
    host: '#859900',
    path: '#268BD2',
    promptChar: '#93A1A1',
    cmdName: '#859900',
    cmdFlag: '#B58900',
    cmdString: '#2AA198',
    cmdArg: '#93A1A1',
    windowShadow: 'rgba(0,0,0,0.45)',
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    background: '#282A36',
    foreground: '#F8F8F2',
    titleBar: '#21222C',
    titleBarText: '#F8F8F2',
    user: '#50FA7B',
    host: '#50FA7B',
    path: '#8BE9FD',
    promptChar: '#F8F8F2',
    cmdName: '#50FA7B',
    cmdFlag: '#FF79C6',
    cmdString: '#F1FA8C',
    cmdArg: '#F8F8F2',
    windowShadow: 'rgba(0,0,0,0.5)',
  },
  light: {
    id: 'light',
    name: 'Light',
    background: '#FBF6F0',
    foreground: '#1F1F1F',
    titleBar: '#E7E2DC',
    titleBarText: '#3C3C3C',
    user: '#2D8E2D',
    host: '#2D8E2D',
    path: '#1F5FB4',
    promptChar: '#1F1F1F',
    cmdName: '#2D8E2D',
    cmdFlag: '#A06700',
    cmdString: '#B0421B',
    cmdArg: '#1F1F1F',
    windowShadow: 'rgba(0,0,0,0.15)',
  },
};

export const themeList: Theme[] = Object.values(themes);

export function getTheme(id: ThemeId): Theme {
  return themes[id] ?? themes.ubuntu;
}
