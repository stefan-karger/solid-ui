const repository = "stefan-karger/solid-ui"
export const repositoryUrl = `https://github.com/${repository}`

let stars: Promise<number | undefined> | undefined

export function getRepositoryStars() {
  return (stars ??= fetch(`https://api.github.com/repos/${repository}`, {
    signal: AbortSignal.timeout(2500)
  })
    .then(async (response) => {
      if (!response.ok) return
      const { stargazers_count } = await response.json()
      if (typeof stargazers_count === "number") return stargazers_count
    })
    .catch(() => undefined))
}
