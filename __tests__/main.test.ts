/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import { findFabricLoaderVersion } from '../__fixtures__/version.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/version.js', () => ({
  findFabricLoaderVersion
}))

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation((name: string) => {
      const inputs: Record<string, string> = {}
      return inputs[name] || ''
    })

    // Mock findFabricLoaderVersion to return a version.
    findFabricLoaderVersion.mockImplementation(() =>
      Promise.resolve('0.69.0+1.21.11')
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Sets the version output when a version is found', async () => {
    await run()

    // Verify findFabricLoaderVersion was called with correct parameters.
    expect(findFabricLoaderVersion).toHaveBeenCalled()

    // Verify the version output was set.
    expect(core.setOutput).toHaveBeenCalledWith('version', '0.69.0+1.21.11')
  })

  it('Sets a failed status when no version is found', async () => {
    // Mock findFabricLoaderVersion to return undefined.
    findFabricLoaderVersion.mockClear().mockResolvedValueOnce(undefined)

    await run()

    // Verify that the action was marked as failed.
    expect(core.setFailed).toHaveBeenCalledWith(
      'No matching Fabric Loader version found'
    )
  })

  it('Sets a failed status when an error occurs', async () => {
    // Mock findFabricLoaderVersion to throw an error.
    findFabricLoaderVersion
      .mockClear()
      .mockRejectedValueOnce(new Error('Fabric Loader request failed: 500'))

    await run()

    // Verify that the action was marked as failed.
    expect(core.setFailed).toHaveBeenCalledWith(
      'Fabric Loader request failed: 500'
    )
  })
})
