/* eslint-disable import/no-extraneous-dependencies */
import swc from 'rollup-plugin-swc';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
// @ts-ignore
import serve from 'rollup-plugin-serve';
import del from 'rollup-plugin-delete';

export default {
  input: 'src/packages/demo/index.tsx',
  output: [
    {
      dir: 'src/packages/demo/out',
      format: 'es',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  plugins: [
    del({ targets: 'src/packages/demo/out/*' }),
    swc({
      minify: true,
      sourceMaps: true,
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
