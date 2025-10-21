import { BackButton, CloudStorage, DeviceStorage, MainButton, SecondaryButton, SecureStorage, SettingsButton } from './web-app'

// Settings Button
export const onSettingsButtonClick = SettingsButton.onClick
export const offSettingsButtonClick = SettingsButton.offClick
export const isSettingsButtonVisible = SettingsButton.isVisible
export const showSettingsButton = SettingsButton.show
export const hideSettingsButton = SettingsButton.hide

// Back Button
export const onBackButtonClick = BackButton.onClick
export const offBackButtonClick = BackButton.offClick
export const isBackButtonVisible = BackButton.isVisible
export const showBackButton = BackButton.show
export const hideBackButton = BackButton.hide

// Main Button
export const mainButtonType = MainButton.type
export const mainButtonText = MainButton.text
export const mainButtonColor = MainButton.color
export const mainButtonTextColor = MainButton.textColor
export const isMainButtonVisible = MainButton.isVisible
export const isMainButtonActive = MainButton.isActive
export const hasMainButtonShineEffect = MainButton.hasShineEffect
export const mainButtonPosition = MainButton.position
export const isMainButtonProgressVisible = MainButton.isProgressVisible
export const setMainButtonText = MainButton.setText
export const onMainButtonClick = MainButton.onClick
export const offMainButtonClick = MainButton.offClick
export const showMainButton = MainButton.show
export const hideMainButton = MainButton.hide
export const enableMainButton = MainButton.enable
export const disableMainButton = MainButton.disable
export const showMainButtonProgress = MainButton.showProgress
export const hideMainButtonProgress = MainButton.hideProgress
export const setMainButtonParams = MainButton.setParams

// Secondary Button
export const secondaryButtonType = SecondaryButton.type
export const secondaryButtonText = SecondaryButton.text
export const secondaryButtonColor = SecondaryButton.color
export const secondaryButtonTextColor = SecondaryButton.textColor
export const isSecondaryButtonVisible = SecondaryButton.isVisible
export const isSecondaryButtonActive = SecondaryButton.isActive
export const hasSecondaryButtonTShineEffect = SecondaryButton.hasShineEffect
export const secondaryButtonPosition = SecondaryButton.position
export const isSecondaryButtonProgressVisible = SecondaryButton.isProgressVisible
export const setSecondaryButtonText = SecondaryButton.setText
export const onSecondaryButtonClick = SecondaryButton.onClick
export const offSecondaryButtonClick = SecondaryButton.offClick
export const showSecondaryButton = SecondaryButton.show
export const hideSecondaryButton = SecondaryButton.hide
export const enableSecondaryButton = SecondaryButton.enable
export const disableSecondaryButton = SecondaryButton.disable
export const showSecondaryButtonProgress = SecondaryButton.showProgress
export const hideSecondaryButtonProgress = SecondaryButton.hideProgress
export const setSecondaryButtonParams = SecondaryButton.setParams

// Cloud Storage
export const setCloudStorageItem = CloudStorage.setItem
export const getCloudStorageItem = CloudStorage.getItem
export const getCloudStorageItems = CloudStorage.getItems
export const removeCloudStorageItem = CloudStorage.removeItem
export const removeCloudStorageItems = CloudStorage.removeItems
export const getCloudStorageKeys = CloudStorage.getKeys

// Device Storage
export const setDeviceStorageItem = DeviceStorage.setItem
export const getDeviceStorageItem = DeviceStorage.getItem
export const removeDeviceStorageItem = DeviceStorage.removeItem
export const clearDeviceStorage = DeviceStorage.clear

// Secure Storage
export const setSecureStorageItem = SecureStorage.setItem
export const getSecureStorageItem = SecureStorage.getItem
export const restoreSecureStorageItem = SecureStorage.restoreItem
export const removeSecureStorageItem = SecureStorage.removeItem
