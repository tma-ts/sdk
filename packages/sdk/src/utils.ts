import type { IWebApp } from '@/types'

/**
 * Custom error indicating that the Telegram WebApp instance is not available.
 */
export class TelegramWebAppUnavailableError extends Error {
  name = 'TelegramWebAppUnavailableError'

  constructor(message = 'Telegram.WebApp is unavailable. Run the code inside Telegram WebView or initialize the SDK earlier (or inject a mock).') {
    super(message)
  }
}

/**
 * Internal reference for an injected source (useful for testing or mocking)
 */
const injectedSource: IWebApp | null = null

/**
 * Resolves the global object in different environments.
 * Returns `globalThis`, `window`, or `undefined` if none is available.
 */
export function resolveGlobal(): any {
  if (typeof globalThis !== 'undefined') return (globalThis as any).window ?? globalThis
  return undefined
}

/**
 * Attempts to retrieve the Telegram WebApp source.
 * Throws an error if the WebApp instance is unavailable.
 */
export function getOriginWebApp(): IWebApp {
  if (injectedSource) return injectedSource
  const g = resolveGlobal()
  const impl: IWebApp | undefined = g?.Telegram?.WebApp ?? (typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : undefined)
  if (!impl) throw new TelegramWebAppUnavailableError()
  return impl
}

/**
 * Asynchronously checks whether the Telegram WebApp instance is available within a given timeout.
 * @param timeoutMs Maximum time to wait for the WebApp instance (default: 1000 ms).
 * @param intervalMs Interval between checks (default: 50 ms).
 * @returns A promise resolving to `true` if the WebApp is available, otherwise `false`.
 */
export function isTMA(timeoutMs = 1000, intervalMs = 50): Promise<boolean> {
  return new Promise((resolve) => {
    const start = Date.now()

    const check = () => {
      try {
        const originWebApp = getOriginWebApp()
        clearInterval(timer)
        resolve(!!originWebApp?.initData)
      } catch {
        if (Date.now() - start >= timeoutMs) {
          clearInterval(timer)
          resolve(false)
        }
      }
    }
    const timer = setInterval(check, intervalMs)
    check()
  })
}
