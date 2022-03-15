import Head from 'next/head'
import { Constants } from '@adobe/aem-spa-page-model-manager'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getPageModel } from '../../lib/pages'

import '../../components/import-components'
import ResponsiveGrid from '../../components/AEMResponsiveGrid'

const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE

const PAGE_PATH=`/content/${NEXT_PUBLIC_AEM_SITE}/duy-sandbox/en`

export default function Uneditable({ model }) {
  const item = model[':items']['root'][':items']['responsivegrid']
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
          cqChildren={item[Constants.CHILDREN_PROP]}
          cqItems={item[Constants.ITEMS_PROP]}
          cqItemsOrder={item[Constants.ITEMS_ORDER_PROP]}
          model={item}
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