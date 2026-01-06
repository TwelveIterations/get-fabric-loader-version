import * as core from '@actions/core'
import { findFabricLoaderVersion } from './version.js'

export async function run(): Promise<void> {
  try {
    const result = await findFabricLoaderVersion()
    if (result) {
      core.setOutput('version', result)
    } else {
      core.setFailed('No matching version found')
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
