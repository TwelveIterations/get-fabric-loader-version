import * as core from '@actions/core'
import { findFabricAPIVersion } from './version.js'

export async function run(): Promise<void> {
  try {
    const minecraftVersion: string = core.getInput('minecraftVersion', {
      required: true
    })

    const result = await findFabricAPIVersion({ minecraftVersion })

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
