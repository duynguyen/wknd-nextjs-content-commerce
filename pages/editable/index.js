import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getPageModel } from '../../lib/pages'

import '../../components/import-components'
import ResponsiveGrid from '../../components/AEMResponsiveGrid'

const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE

const PAGE_PATH=`/content/${NEXT_PUBLIC_AEM_SITE}/us/en/next-home`

export default function Editable({ model }) {
  return (
    <Layout>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <p>A paragraph in React.</p>
        <ResponsiveGrid
          model={model[':items']['root'][':items']['responsivegrid']}
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid'
        />
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const model = await getPageModel(PAGE_PATH)
  console.log(model)
  return {
    props: {
      model
    }
  }
}