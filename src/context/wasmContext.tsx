import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react'

export interface WasmContextProps {
  wasm: WASM | null
  readyState: WASM_READY_STATE
}

export enum WASM_READY_STATE {
  ERROR = -2,
  NOT_READY = 0,
  READY = 1,
}

const WasmContextDefaultValue: WasmContextProps = {
  wasm: null,
  readyState: WASM_READY_STATE.NOT_READY,
}

export const WasmContext = createContext(WasmContextDefaultValue)

export const WasmContextProvider = (props: PropsWithChildren) => {
  const { children } = props
  const [wasmObject, setWasmObject] = useState<WasmContextProps>({
    wasm: null,
    readyState: WASM_READY_STATE.NOT_READY,
  })

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const wasm = (await import('wasm')) || null
        setWasmObject({ wasm, readyState: WASM_READY_STATE.READY })
      } catch (e) {
        console.error(e)
        setWasmObject({ wasm: null, readyState: WASM_READY_STATE.ERROR })
      }
    }

    loadWasm()
  }, [])

  return (
    <WasmContext.Provider value={wasmObject}>{children}</WasmContext.Provider>
  )
}

export const useWasm = () => {
  const context = useContext(WasmContext)
  if (!context) {
    throw new Error('usePageContext must be wrapped in PageContext.Provider!')
  }

  return context
}

export const withWasmContext = <
  P extends PropsWithChildren<JSX.IntrinsicAttributes>,
>(
  Component: React.ComponentType<any>,
) => {
  return (props: P) => (
    <WasmContextProvider>
      <Component {...props} />
    </WasmContextProvider>
  )
}
