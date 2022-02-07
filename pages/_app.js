import '../styles/global.css'

import { ModelManager, ModelClient } from "@adobe/aem-spa-page-model-manager"

import '../components/import-components'

const { NEXT_PUBLIC_AEM_HOST } = process.env

const modelClient = new ModelClient(NEXT_PUBLIC_AEM_HOST)
ModelManager.initializeAsync({
    modelClient
})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}