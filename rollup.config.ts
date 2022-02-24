/* eslint-disable import/no-extraneous-dependencies */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-node-externals';
import * as path from 'path';
import typescript from 'rollup-plugin-typescript2';
// @ts-ignore
import generatePackageJson from 'rollup-plugin-generate-package-json';
// @ts-ignore
import pkg from './package.json';

export default ['render'].map((res) => ({
  input: `./src/packages/${res}`,
  output: [
    {
      file: path.join('src/packages', res, 'out', pkg.main),
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: path.join('src/packages', res, 'out', pkg.module),
      format: 'es',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: path.join('src/packages', res, 'out', 'dist/index.js'),
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: ['**/__tests__/**', '*.spec.*', '*.test.*'],
      clean: true,
      tsconfigDefaults: {
        rootDir: path.join('src/packages', res),
      },
    }),

    external(),

    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),

    commonjs(),

    generatePackageJson({
      outputFolder: path.join('src/packages', res, 'out'),
      baseContents: JSON.parse(
        JSON.stringify({
          ...pkg,
          name: `@anthaathi/${res}`,
          devDependencies: undefined,
          scripts: undefined,
          prettier: undefined,
        }),
      ),
    }),
  ],
}));
