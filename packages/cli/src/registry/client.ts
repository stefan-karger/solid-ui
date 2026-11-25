import {
  registryItemSchema,
  registrySchema,
  type Registry,
  type RegistryItem
} from "@solid-ui/registry/schema"
import type { z } from "zod"

import { SOLID_UI_URL } from "~/constants"
import { CliError } from "~/utils/errors"

export type Fetch = (url: string) => Promise<Response>

// The registry host. SOLID_UI_REGISTRY_URL points the CLI at a local docs
// server or a preview deploy.
export function registryBaseUrl(env = process.env) {
  return (env.SOLID_UI_REGISTRY_URL?.trim() || SOLID_UI_URL).replace(/\/+$/, "")
}

export type RegistryClient = ReturnType<typeof createRegistryClient>

export function createRegistryClient(
  baseUrl = registryBaseUrl(),
  fetchImpl: Fetch = (url) => fetch(url)
) {
  const cache = new Map<string, Promise<unknown>>()

  async function load(path: string) {
    const url = `${baseUrl}/r/${path}`
    let response: Response
    try {
      response = await fetchImpl(url)
    } catch (error) {
      throw new CliError(
        `Could not reach the registry at ${url}.\n${error instanceof Error ? error.message : String(error)}`
      )
    }
    if (response.status === 404) return null
    if (!response.ok) {
      throw new CliError(
        `The registry at ${url} responded with ${response.status} ${response.statusText}.`
      )
    }
    try {
      return await response.json()
    } catch {
      throw new CliError(
        `The registry at ${url} did not return JSON. A preview deploy behind Vercel Deployment Protection answers with a login page.`
      )
    }
  }

  async function get<T extends z.ZodType>(path: string, schema: T) {
    let pending = cache.get(path)
    if (!pending) {
      pending = load(path)
      cache.set(path, pending)
    }
    const data = await pending
    if (data === null) return null
    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      throw new CliError(
        `The registry at ${baseUrl}/r/${path} returned an unexpected format.\n${parsed.error.message}`
      )
    }
    return parsed.data as z.output<T>
  }

  return {
    baseUrl,
    async catalog(style: string): Promise<Registry> {
      const catalog = await get(`styles/${style}/registry.json`, registrySchema)
      if (!catalog)
        throw new CliError(`The registry has no style named ${style}.`)
      return catalog
    },
    async item(style: string, name: string): Promise<RegistryItem | null> {
      return get(`styles/${style}/${name}.json`, registryItemSchema)
    }
  }
}
