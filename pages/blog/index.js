import Head from 'next/head'
import { ModelManager, Constants } from '@adobe/aem-spa-page-model-manager'
import CustomModelClient from '../../lib/CustomModelClient'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { AEMTitle } from '../../components/AEMTitle'
import { AEMImage } from '../../components/AEMImage'
import { AEMText } from '../../components/AEMText'
import { getPageModel } from '../../lib/pages'

const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST
const NEXT_PUBLIC_AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE

const PAGE_PATH=`/content/${NEXT_PUBLIC_AEM_SITE}/us/en/next-home`

export default function Blog({ model }) {
  const modelClient = new CustomModelClient(NEXT_PUBLIC_AEM_HOST)
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
        {/* <h1 className={utilStyles.headingXl}>My Blog</h1> */}
        <AEMTitle
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid/title'
        />
        <AEMImage
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid/image'
        />
        <AEMText
          pagePath={PAGE_PATH}
          itemPath='root/responsivegrid/text'
        />
        {/* <AEMTitle
          pagePath='/content/s504-wknd-app/us/en/next-home'
          itemPath='root/responsivegrid/title' />
        <AEMImage
          pagePath='/content/s504-wknd-app/us/en/next-home'
          itemPath='root/responsivegrid/image'/>
        <AEMText
          pagePath='/content/s504-wknd-app/us/en/next-home'
          itemPath='root/responsivegrid/text'/> */}
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