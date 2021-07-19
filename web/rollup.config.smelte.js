import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
const smelte = require("smelte/rollup-plugin-smelte");
import url from "@rollup/plugin-url";
import glob from "glob";
import path from "path";

// to purge css file set to true
// if error like this occurs : [!] (plugin postcss) Error: ENOTDIR: not a directory, scandir 'src/components/Nav.svelte',
// see PR "Fix css-extractor.js" #185 on smelte. (https://github.com/matyunya/smelte/pull/185)
const production = true;

const clientRoutes = ["src/routes/*.*", "src/routes/**/*.*"];
export default {
  input: "smelte-sapper-preloader.js",
  output: {
    sourcemap: false,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    {
      name: "smelte-sapper-preloader",
      resolveId(id, importer) {
        if (id === "smelte-sapper-preloader.js") {
          return id;
        }
        return null;
      },

      load(id) {
        if (id === "smelte-sapper-preloader.js") {
          let result = "import 'smelte/src/tailwind.css';\n";
          const files = clientRoutes;
          let i = 1;
          for (let f of files) {
            const files2 = glob.sync(f);
            files2.forEach((v) => {
              result +=
                "import " +
                (v.endsWith(".svelte") ? "" : "* as ") +
                "x" +
                (i++).toString() +
                " from './" +
                v +
                "';\n";
            });
          }
          return result;
        }
        return null;
      },
    },
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write("bundle.css");
      },
      preprocess: sveltePreprocess(),
    }),
    url({
      sourceDir: path.resolve(__dirname, "src/node_modules/images"),
      publicPath: "/client/",
    }),
    smelte({
      purge: production,
      output: "./static/global_smelte.css", // it defaults to static/global.css which is probably what you expect in Sapper
      postcss: [], // Your PostCSS plugins
      whitelist: [], // Array of classnames whitelisted from purging
      whitelistPatterns: [], // Same as above, but list of regexes
      tailwind: {}, // Any other props will be applied on top of default Smelte tailwind.config.js
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
