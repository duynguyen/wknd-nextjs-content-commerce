import '../styles/theme.css'
import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import CustomModelClient from '../lib/CustomModelClient'
import { GlobalProvider } from '../lib/globalContext';
import '../components/import-components'
import CartContextProvider from '../lib/cartContext';

const contextValue = {
  aemHost: process.env.NEXT_PUBLIC_AEM_HOST,
  rootPath: process.env.NEXT_PUBLIC_AEM_PATH
}

const modelClient = new CustomModelClient(contextValue.aemHost)
ModelManager.initializeAsync({
  modelClient,
})

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider value={contextValue}>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </GlobalProvider>
  )
}
