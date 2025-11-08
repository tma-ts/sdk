import { defineConfig } from 'tsdown'

export default defineConfig({
  external: ['react', /^@tma-ts\//]
})
