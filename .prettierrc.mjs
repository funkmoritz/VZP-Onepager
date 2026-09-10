/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  semi: true,
  printWidth: 100,

  // prettier-plugin-tailwindcss muss als letztes Plugin stehen.
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

  // Tailwind v4 liest die Konfiguration aus dem CSS, nicht aus einer JS-Datei.
  tailwindStylesheet: './src/styles/global.css',

  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
};
