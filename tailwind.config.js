/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Ubuntu Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Ubuntu', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        ubuntu: {
          purple: '#300A24',
          aubergine: '#2C001E',
          titlebar: '#3C3B37',
          orange: '#E95420',
        },
      },
    },
  },
  plugins: [],
};
