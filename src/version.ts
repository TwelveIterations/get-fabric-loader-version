export async function findFabricAPIVersion(options: {
  minecraftVersion: string
}): Promise<string | undefined> {
  const { minecraftVersion } = options
  if (!minecraftVersion || typeof minecraftVersion !== 'string') {
    throw new Error('minecraftVersion is not a string')
  }

  const response = await fetch('https://maven.fabricmc.net/jdlist.txt')
  const content = await response.text()
  const lines = content.split('\n').reverse()
  let apiVersion = lines.find(
    (it) => it.startsWith('fabric-api-') && it.endsWith(`+${minecraftVersion}`)
  )
  const baseMinecraftVersion = minecraftVersion.split('.').slice(0, 2).join('.')
  if (!apiVersion) {
    apiVersion = lines.find((it) =>
      it.match(new RegExp(`fabric-api-.+\\+${baseMinecraftVersion}\\..+`, 'g'))
    )
  }
  if (!apiVersion) {
    apiVersion = lines.find(
      (it) =>
        it.startsWith('fabric-api-') && it.endsWith(`+${baseMinecraftVersion}`)
    )
  }
  return apiVersion
}
