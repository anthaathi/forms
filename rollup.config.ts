/* eslint-disable import/no-extraneous-dependencies */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-node-externals';
import * as path from 'path';
// @ts-ignore
import generatePackageJson from 'rollup-plugin-generate-package-json';
import swc from 'rollup-plugin-swc';

// @ts-ignore
import pkg from './package.json';

const { PROJECT_ID } = process.env;

const projectHasTsFile = ['cli', 'core'];

export default ['render', 'cli', 'core'].filter((res) => PROJECT_ID === res || !PROJECT_ID).map((res) => ({
  input: path.join(__dirname, `./src/packages/${projectHasTsFile.indexOf(res) !== -1 ? `${res}/index.ts` : `${res}/index.tsx`}`),
  output: [
    {
      file: path.join('src/packages', res, 'out', pkg.main),
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
    },
    {
      file: path.join('src/packages', res, 'out', pkg.module),
      format: 'es',
      exports: 'auto',
      sourcemap: true,
    },
    {
      file: path.join('src/packages', res, 'out', 'dist/index.js'),
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
    },
  ],
  plugins: [
    swc({
      minify: true,
      sourceMaps: true,
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
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
