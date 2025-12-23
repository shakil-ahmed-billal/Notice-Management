import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './node_modules/tw-animate-css/**/*.js',  // Animate CSS plugin (if required)
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tw-animate-css')],  // Include the animate plugin
};

export default config;
