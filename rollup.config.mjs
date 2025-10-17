import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', format: 'esm', sourcemap: false },
      { file: 'dist/index.min.js', format: 'esm', plugins: [terser()] },
    ],
    plugins: [
      resolve({ preferBuiltins: true }),
      typescript({ tsconfig: './tsconfig.prod.json' })
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]