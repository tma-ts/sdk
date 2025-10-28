import type { IWebApp } from './types'
import { getOriginWebApp } from './utils'

/**
 * A unified lazy proxy that provides typed, dynamic access to the Telegram WebApp API.
 *
 * @remarks
 * - The proxy resolves the underlying `Telegram.WebApp` instance at call-time.
 * - No side-effects are introduced: it neither initializes nor mutates the WebApp by itself.
 * - In non-Telegram environments, property access will throw a `TelegramWebAppUnavailableError`
 *   via `getOriginWebApp()`, which is intentional for clear failure signaling.
 */
export const WebApp = new Proxy({} as IWebApp, {
  get(_t, prop: keyof IWebApp | string) {
    const target = getOriginWebApp() as any
    const value = target[prop]
    return typeof value === 'function' ? value.bind(target) : value
  },
  set(_t, prop: keyof IWebApp | string, value: unknown) {
    ;(getOriginWebApp() as any)[prop] = value
    return true
  },
  has(_t, prop: keyof IWebApp | string) {
    return prop in getOriginWebApp()
  },
  ownKeys() {
    return Reflect.ownKeys(getOriginWebApp())
  },
  getOwnPropertyDescriptor(_t, prop: keyof IWebApp | string) {
    const desc = Object.getOwnPropertyDescriptor(getOriginWebApp(), prop as any)
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
