import Head from 'next/head'
import { ModelManager, ModelClient, Constants } from '@adobe/aem-spa-page-model-manager'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { AEMTitle } from '../../components/AEMTitle'
import { AEMImage } from '../../components/AEMImage'
import { AEMText } from '../../components/AEMText'
import { getPageModel } from '../../lib/pages'

const { NEXT_PUBLIC_AEM_HOST } = process.env

export default function Blog({ model }) {
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
        {/* <h1 className={utilStyles.headingXl}>My Blog</h1> */}
        <AEMTitle
          itemPath='root/responsivegrid/title'
        />
        <AEMImage
          itemPath='root/responsivegrid/image'
        />
        <AEMText 
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
  const model = await getPageModel('/content/s504-wknd-app/us/en/next-home')
  console.log(model)
  return {
    props: {
      model
    }
  }
}