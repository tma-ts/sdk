import { BiometricManager, type IBiometricManager } from '@tma-ts/sdk'
import { createContext, type ReactNode } from 'react'

// Тип контекста
const SelectedNodeContext = createContext<IBiometricManager>({} as IBiometricManager)

// Провайдер
export const BiometricProvider = ({ children }: { children: ReactNode }) => {
  const node = useUnit($selectedNode)
  const select = useUnit(selectNodeFx)
  const transformer = useUnit($transformerInstance)
  const type = useMemo(() => {
    if (Array.isArray(node)) return 'Array'
    else if (node === null || node === undefined) return String(node)
    else return String(node.component)
  }, [node])

  return <SelectedNodeContext.Provider value={{ node, transformer, select, type }}>{children}</SelectedNodeContext.Provider>
}

// Хук
export const useSelectedNode = (): SelectedNodeContextType => {
  const ctx = useContext(SelectedNodeContext)
  if (!ctx) throw new Error('useSelectedNode must be used within SelectedNodeProvider')
  return ctx
}
