export async function findFabricLoaderVersion(): Promise<string | undefined> {
  const response = await fetch('https://maven.fabricmc.net/jdlist.txt')
  const content = await response.text()
  const lines = content.split('\n').reverse()
  return lines
    .find((it) => it.startsWith('fabric-loader-'))
    ?.substring('fabric-loader-'.length)
}
