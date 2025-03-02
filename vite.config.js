/**
 * @type {import('vite').UserConfig}
 */

import glslRawPlugin from "vite-raw-plugin";
import glsl from "vite-plugin-glsl";

export default {
  // config options
  build: {
    target: "esnext",
  },
  plugins: [
    glsl(),
    glslRawPlugin({
      fileRegex: /\.md$/,
    }),
  ],
  base: "/card/",
};
