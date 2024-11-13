import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css'; // Replace with 'rollup-plugin-postcss' if needed
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default {
  input: Object.fromEntries(
    globSync('api/**/*.*').map((file) => [
      path.relative(
        'api',
        file.slice(0, file.length - path.extname(file).length)
      ),
      fileURLToPath(new URL(file, import.meta.url)),
    ])
  ),
  output: {
    format: 'es',
    dir: 'dist',
    sourcemap: true, // Enable source maps for debugging
  },
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.tsx', '.jsx'] }),
    commonjs(), // For converting CommonJS modules to ES modules
    typescript({ jsx: 'react' }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    css({ output: 'bundle.css' }), // Use 'rollup-plugin-postcss' for more options
  ],
  external: [
    'react',
    'react-dom',
    'express',
    'mongoose',
    'dotenv',
    'cors',
    'adminjs',
    '@adminjs/express',
    '@adminjs/mongoose',
    '@adminjs/upload',
  ],
};

