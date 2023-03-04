import '@/styles/globals.css'
import { QuioscoProvider } from '@/context/QuioscoProvider'
//aqui rodeas tus provider de tus context y sigues el mismo de context como has venido aprendiendo

export default function App({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}
