import Head from 'next/head'
import { ModelManager, Constants } from '@adobe/aem-spa-page-model-manager'
import CustomModelClient from '../../lib/CustomModelClient'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getPageModel } from '../../lib/pages'

import '../../components/import-components'
import ResponsiveGrid from '../../components/AEMResponsiveGrid'

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST
const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE

const PAGE_PATH=`/content/${NEXT_PUBLIC_AEM_SITE}/us/en/next-home`
const modelClient = new CustomModelClient(NEXT_PUBLIC_AEM_HOST)

export default function Uneditable({ model }) {
  ModelManager.initialize({
    path: PAGE_PATH,
    modelClient,
    model
  })
  return (
    <Layout>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <p>A paragraph in React.</p>
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
  const model = await getPageModel(PAGE_PATH)
  console.log(model)
  return {
    props: {
      model
    }
  }
}