/**
 * Unit tests for src/version.ts
 */
import { jest } from '@jest/globals'
import { findFabricAPIVersion } from '../src/version.js'

// Mock node-fetch
const mockFetch = jest.fn()
jest.unstable_mockModule('node-fetch', () => ({
  default: mockFetch
}))

describe('version.ts', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('Throws when minecraftVersion is missing', async () => {
    await expect(
      findFabricAPIVersion({
        minecraftVersion: ''
      })
    ).rejects.toThrow('minecraftVersion is not a string')
  })
})
