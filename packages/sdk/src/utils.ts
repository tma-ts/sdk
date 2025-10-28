import type { IWebApp } from './types'

/**
 * Custom error indicating that the Telegram WebApp instance is not available.
 * This error is thrown when the code runs outside Telegram WebView or the SDK isn't initialized.
 */
export class TelegramWebAppUnavailableError extends Error {
  name = 'TelegramWebAppUnavailableError'
  constructor(message = 'Telegram.WebApp is unavailable. Run inside a Telegram WebView or inject a mock during tests.') {
    super(message)
  }
}

let _cachedWebApp: IWebApp | undefined

/**
 * Resolves the global object across environments (browser, workers, SSR).
 * Returns `globalThis` if available, otherwise `undefined`.
 */
export function resolveGlobal(): any {
  if (typeof globalThis !== 'undefined') {
    return (globalThis as any).window ?? globalThis
  }
  return undefined
}

/**
 * Returns the origin Telegram WebApp instance.
 * Throws TelegramWebAppUnavailableError when not available.
 */
export function getOriginWebApp(): IWebApp {
  if (_cachedWebApp) return _cachedWebApp
  const g = resolveGlobal()
  const instance: IWebApp | undefined = g?.Telegram?.WebApp ?? (typeof g?.window !== 'undefined' ? (g.window as any)?.Telegram?.WebApp : undefined)
  if (!instance) throw new TelegramWebAppUnavailableError()
  _cachedWebApp = instance
  return instance
}

/**
 * Asynchronously checks whether the Telegram WebApp instance becomes available within a timeout.
 *
 * @param timeoutMs Maximum time to wait for availability (default: 1000 ms).
 * @param intervalMs Polling interval (default: 50 ms).
 * @returns Promise resolving to `true` if available within the timeout, otherwise `false`.
 *
 * @remarks
 * This function does not trigger any side-effects in the WebApp environment.
 * It is safe to call during application bootstrap or feature detection.
 */
export function isTMA(timeoutMs = 1000, intervalMs = 50): Promise<boolean> {
  return new Promise((resolve) => {
    const start = Date.now()

    const check = () => {
      try {
        const originWebApp = getOriginWebApp()
        if (originWebApp && originWebApp?.initData !== undefined) {
          cleanup()
          resolve(true)
          return
        }
      } catch {
        // ignore; fall through to timeout logic
      }
      if (Date.now() - start >= timeoutMs) {
        cleanup()
        resolve(false)
      }
    }

    const timer = setInterval(check, intervalMs)

    function cleanup() {
      clearInterval(timer)
    }
    check()
  })
}
