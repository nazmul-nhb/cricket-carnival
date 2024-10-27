import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        shadowBG: 'url("/src/assets/images/shadow.png")',
      },
    },
  },
  plugins: [],
};

export default config;
