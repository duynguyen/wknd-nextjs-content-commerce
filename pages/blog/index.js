import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { AEMTitle } from '../../components/AEMTitle'
import { AEMImage } from '../../components/AEMImage'
import { AEMText } from '../../components/AEMText'
import { getPageModel } from '../../lib/pages'
import ResponsiveGrid from '../../components/AEMResponsiveGrid'

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST
const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE

const PAGE_PATH=`/content/${NEXT_PUBLIC_AEM_SITE}/us/en/next-home`

export default function Blog({ model }) {
  const gridModel = model[':items']['root'][':items']['responsivegrid']
  return (
    <Layout>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* <h1 className={utilStyles.headingXl}>My Blog</h1> */}
        <h1>--- Rendering entire container in responsive grid ---</h1>
        <ResponsiveGrid
          model={gridModel}
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid'
        />
        <h1>--- Rendering individual components ---</h1>
        <AEMTitle
          model={gridModel[':items']['title']}
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid/title'
        />
        <AEMImage
          model={gridModel[':items']['image']}
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid/image'
        />
        <AEMText
          model={gridModel[':items']['text']}
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid/text'
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