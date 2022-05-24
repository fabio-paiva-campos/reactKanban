import '../styles/globals.css'
import '../styles/layout.scss'
import '../styles/index.scss'
import '../styles/cardItem.scss'
import '../styles/modal.scss'
import type { AppProps } from 'next/app'
import { ContextWrap } from '../hooks/Context'

function App({ Component, pageProps }: AppProps) {
  return (
    <ContextWrap>
      <Component {...pageProps} />
    </ContextWrap>
  )
}

export default App