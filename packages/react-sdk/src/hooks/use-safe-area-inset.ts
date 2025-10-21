import { type ISafeAreaInset, offEvent, onEvent, safeAreaInset } from '@tma-ts/sdk'
import { useCallback, useEffect, useState } from 'react'

export function useSafeAreaInset(): ISafeAreaInset {
  const [safeArea, setSafeArea] = useState<ISafeAreaInset>(safeAreaInset)

  const handleSafeAreaChange = useCallback(() => {
    console.log('handleSafeAreaChange')
    setSafeArea(safeAreaInset)
  }, [])

  useEffect(() => {
    onEvent('safeAreaChanged', handleSafeAreaChange)

    return () => {
      offEvent('safeAreaChanged', handleSafeAreaChange)
    }
  }, [handleSafeAreaChange])

  return safeArea
}
