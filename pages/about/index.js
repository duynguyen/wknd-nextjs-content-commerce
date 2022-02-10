import Head from 'next/head'
import { ModelManager, ModelClient, Constants } from '@adobe/aem-spa-page-model-manager'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getPageModel } from '../../lib/pages'

import '../../components/import-components'

import ResponsiveGrid from '../../components/AEMResponsiveGrid'

const { NEXT_PUBLIC_AEM_HOST } = process.env

export default function About({ model }) {
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
        {/* <ResponsiveGrid
          itemPath='root/responsivegrid'/> */}
        <ResponsiveGrid
          cqChildren={model[Constants.CHILDREN_PROP]}
          cqItems={model[Constants.ITEMS_PROP]}
          cqItemsOrder={model[Constants.ITEMS_ORDER_PROP]}
          cqPath={model[Constants.PATH_PROP]}
        />
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const model = await getPageModel('/content/s504-wknd-app/us/en/new-home')
  console.log(model)
  return {
    props: {
      model
    }
  }
}