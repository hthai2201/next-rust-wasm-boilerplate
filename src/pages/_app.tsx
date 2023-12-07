import '../styles/index.css'
import React from 'react'
import NProgressHandler from 'components/NProgressHandler'
import Head from 'next/head'
import { AuthContextProvider } from 'context/auth'
import { Toaster } from 'components/Toast'
import { AppProps } from 'next/app'
import { useWasm, withWasmContext } from 'context/wasmContext'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line global-require
  require('mocks')
}

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const { wasm } = useWasm()
  console.log('wasm :>> ', wasm?.say_hello_from_rust())
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>NextJS boilerplate | Dwarves Foundation</title>
        <meta
          content="NextJS boilerplate | Dwarves Foundation"
          property="og:title"
        />
        <meta content="@dwarvesf" name="twitter:site" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          content="Opinionated React template for building web applications at scale."
          name="description"
        />
        <meta
          content="Opinionated React template for building web applications at scale."
          property="og:description"
        />
        <meta content="/thumbnail.jpeg" property="og:image" />
        <meta content="/thumbnail.jpeg" name="twitter:image" />
      </Head>
      <AuthContextProvider>
        <NProgressHandler />
        <Component {...pageProps} />
      </AuthContextProvider>
      <Toaster />
    </>
  )
}
export default withWasmContext(MyApp)
