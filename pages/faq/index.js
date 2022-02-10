import Head from 'next/head'
import { ModelManager, ModelClient, Constants } from '@adobe/aem-spa-page-model-manager'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getPageModel } from '../../lib/pages'

import '../../components/import-components'

import ResponsiveGrid from '../../components/AEMResponsiveGrid'

const { NEXT_PUBLIC_AEM_HOST } = process.env

export default function Faq({ model }) {
  const modelClient = new ModelClient(NEXT_PUBLIC_AEM_HOST)
  ModelManager.initialize({
    path: '/',
    modelClient,
    model
  })
  return (
    <Layout>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ResponsiveGrid
          itemPath='root/responsivegrid'/>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const model = await getPageModel('/content/s504-wknd-app/us/en/about')
  console.log(model)
  return {
    props: {
      model
    }
  }
}