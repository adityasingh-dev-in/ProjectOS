import path from "path";

const escape = (files) =>
  files.map((f) => `"${f.replace(/\\/g, "/")}"`).join(" ");

export default {
  "apps/web/app/**/*.{js,jsx,ts,tsx,mjs,cjs}": (filenames) => {
    const relativeFiles = filenames.map((file) =>
      path.relative(path.resolve("apps/web"), file),
    );
    return [
      `prettier --write ${escape(filenames)}`,
      `pnpm --filter web exec eslint --fix ${escape(relativeFiles)}`,
    ];
  },
  "apps/server/src/**/*.{js,jsx,ts,tsx,mjs,cjs}": (filenames) => {
    const relativeFiles = filenames.map((file) =>
      path.relative(path.resolve("apps/server"), file),
    );
    return [
      `prettier --write ${escape(filenames)}`,
      `pnpm --filter server exec eslint --fix ${escape(relativeFiles)}`,
    ];
  },
  "!(apps/web|apps/server)/**/*.{js,jsx,ts,tsx,mjs,cjs}": (filenames) => {
    // This covers root config files and packages/* – ensure they have ESLint configs if you run eslint on them.
    return `prettier --write ${escape(filenames)}`;
  },
  "**/*.{json,jsonc,md,mdx,css,scss,yml,yaml,html}": (filenames) => {
    return `prettier --write ${escape(filenames)}`;
  },
};
