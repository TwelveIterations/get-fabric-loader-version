import { jest } from '@jest/globals'

interface MockResponse {
  text: () => Promise<string>
}

const mockFetch = jest.fn<() => Promise<MockResponse>>()
export { mockFetch }
export default mockFetch
