import { jest } from '@jest/globals'

export const findFabricLoaderVersion =
  jest.fn<typeof import('../src/version.js').findFabricLoaderVersion>()
