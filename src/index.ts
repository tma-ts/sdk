import { IWebApp } from './types'

/**
 * Custom error indicating that the Telegram WebApp instance is not available.
 */
export class TelegramWebAppUnavailableError extends Error {
  name = 'TelegramWebAppUnavailableError'

  constructor(message = 'Telegram.WebApp is unavailable. Run the code inside Telegram WebView or initialize the SDK earlier (or inject a mock).') {
    super(message)
  }
}

type Source = Record<string, any>;

/**
 * Internal reference for an injected source (useful for testing or mocking)
 */
let injectedSource: Source | null = null

/**
 * Resolves the global object in different environments.
 * Returns `globalThis`, `window`, or `undefined` if none is available.
 */
function resolveGlobal(): any {
  if (typeof globalThis !== 'undefined') return (globalThis as any).window ?? globalThis
  return undefined
}

/**
 * Attempts to retrieve the Telegram WebApp source.
 * Throws an error if the WebApp instance is unavailable.
 */
function tryGetSource(): Source {
  if (injectedSource) return injectedSource
  const g = resolveGlobal()
  const impl: Source | undefined = g?.Telegram?.WebApp ?? (typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : undefined)
  if (!impl) throw new TelegramWebAppUnavailableError()
  return impl
}

/**
 * Overrides the WebApp source (useful for dependency injection or unit testing).
 * @param mock The mock implementation to use, or `null` to reset.
 */
export function setSource(mock: Source | null) {
  injectedSource = mock
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
        void tryGetSource()
        clearInterval(timer)
        resolve(true)
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

/**
 * A unified lazy proxy that provides typed, dynamic access to the Telegram WebApp API.
 * The proxy automatically resolves the WebApp instance at runtime.
 */
export const WebApp = new Proxy({} as IWebApp, {
  get(_t, prop) {
    const target = tryGetSource() as any
    const value = target[prop]
    return typeof value === 'function' ? value.bind(target) : value
  },
  set(_t, prop, value) {
    (tryGetSource() as any)[prop] = value
    return true
  },
  has(_t, prop) {
    return prop in tryGetSource()
  },
  ownKeys() {
    return Reflect.ownKeys(tryGetSource())
  },
  getOwnPropertyDescriptor(_t, prop) {
    const desc = Object.getOwnPropertyDescriptor(tryGetSource(), prop)
    return desc ? { ...desc, configurable: true, enumerable: true } : undefined
  }
}) as IWebApp

export const {
  initData,
  initDataUnsafe,
  version,
  platform,
  colorScheme,
  themeParams,
  isActive,
  isExpanded,
  viewportHeight,
  viewportStableHeight,
  headerColor,
  backgroundColor,
  bottomBarColor,
  isClosingConfirmationEnabled,
  isFullscreen,
  isOrientationLocked,
  safeAreaInset,
  contentSafeAreaInset,
  BackButton,
  MainButton,
  SecondaryButton,
  SettingsButton,
  HapticFeedback,
  CloudStorage,
  BiometricManager,
  Accelerometer,
  DeviceOrientation,
  Gyroscope,
  LocationManager,
  DeviceStorage,
  SecureStorage,
  isVersionAtLeast,
  setHeaderColor,
  setBackgroundColor,
  setBottomBarColor,
  enableClosingConfirmation,
  disableClosingConfirmation,
  sendData,
  onEvent,
  offEvent,
  switchInlineQuery,
  openLink,
  openTelegramLink,
  openInvoice,
  showPopup,
  showAlert,
  showConfirm,
  showScanQrPopup,
  closeScanQrPopup,
  shareToStory,
  shareMessage,
  setEmojiStatus,
  requestEmojiStatusAccess,
  downloadFile,
  hideKeyboard,
  readTextFromClipboard,
  requestWriteAccess,
  requestContact,
  ready,
  expand,
  close,
  isVerticalSwipesEnabled,
  enableVerticalSwipes,
  disableVerticalSwipes,
  requestFullscreen,
  exitFullscreen,
  lockOrientation,
  unlockOrientation,
  addToHomeScreen,
  checkHomeScreenStatus
} = WebApp