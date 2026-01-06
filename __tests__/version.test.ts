/**
 * Unit tests for src/version.ts
 */
import { jest } from '@jest/globals'

const mockFetch = jest.fn<typeof fetch>()

// Mock global fetch
global.fetch = mockFetch

describe('version.ts', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('findFabricLoaderVersion', () => {
    it('should return the latest fabric loader version', async () => {
      const mockContent = `some-other-line
another-line
fabric-loader-0.14.19
fabric-loader-0.14.20
fabric-loader-0.14.21`

      mockFetch.mockResolvedValue({
        text: () => Promise.resolve(mockContent)
      } as Response)

      const { findFabricLoaderVersion } = await import('../src/version')
      const result = await findFabricLoaderVersion()

      expect(result).toBe('0.14.21')
      expect(mockFetch).toHaveBeenCalledWith(
        'https://maven.fabricmc.net/jdlist.txt'
      )
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should return undefined when no fabric loader version is found', async () => {
      const mockContent = `some-other-line
another-line
no-fabric-loader-here`

      mockFetch.mockResolvedValue({
        text: () => Promise.resolve(mockContent)
      } as Response)

      const { findFabricLoaderVersion } = await import('../src/version')
      const result = await findFabricLoaderVersion()

      expect(result).toBeUndefined()
    })

    it('should handle empty response', async () => {
      mockFetch.mockResolvedValue({
        text: () => Promise.resolve('')
      } as Response)

      const { findFabricLoaderVersion } = await import('../src/version')
      const result = await findFabricLoaderVersion()

      expect(result).toBeUndefined()
    })
  })
})
