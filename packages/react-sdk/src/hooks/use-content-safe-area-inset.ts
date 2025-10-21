import { contentSafeAreaInset, type IContentSafeAreaInset, offEvent, onEvent, safeAreaInset } from '@tma-ts/sdk'
import { useCallback, useEffect, useState } from 'react'

export function useContentSafeAreaInset(): IContentSafeAreaInset {
  const [contentSafeArea, setContentSafeArea] = useState<IContentSafeAreaInset>(contentSafeAreaInset)

  const handleContentSafeAreaChange = useCallback(() => {
    console.log('handleContentSafeAreaChange')
    setContentSafeArea(safeAreaInset)
  }, [])

  useEffect(() => {
    onEvent('contentSafeAreaChanged', handleContentSafeAreaChange)

    return () => {
      offEvent('contentSafeAreaChanged', handleContentSafeAreaChange)
    }
  }, [handleContentSafeAreaChange])

  return contentSafeArea
}
