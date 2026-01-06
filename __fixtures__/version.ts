import { jest } from '@jest/globals'

export const findFabricAPIVersion =
  jest.fn<typeof import('../src/version.js').findFabricAPIVersion>()
