/* eslint-disable import/no-extraneous-dependencies */
import swc from 'rollup-plugin-swc';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
// @ts-ignore
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/packages/demo/index.tsx',
  output: [
    {
      file: 'src/packages/demo/out/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  plugins: [
    swc({
      minify: true,
      sourceMaps: 'inline',
    }),

    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),

    commonjs(),

    serve({
      port: parseInt(`${process.env.PORT || 3000}`, 10),
      contentBase: 'src/packages/demo',
      openPage: '/',
    }),

    livereload(),
  ],
};
