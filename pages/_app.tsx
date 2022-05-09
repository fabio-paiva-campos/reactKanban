import '../styles/globals.css'
import '../styles/layout.scss'
import '../styles/index.scss'
import '../styles/cardItem.scss'
import '../styles/modal.scss'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App