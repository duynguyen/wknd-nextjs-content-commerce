import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { AEMTitle } from '../../components/AEMTitle'
import { AEMImage } from '../../components/AEMImage'
import { AEMText } from '../../components/AEMText'

export default function Blog() {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* <h1 className={utilStyles.headingXl}>My Blog</h1> */}
        <AEMTitle
          pagePath='/content/s504-wknd-app/us/en/next-home'
          itemPath='root/responsivegrid/title' />
        <AEMImage
          pagePath='/content/s504-wknd-app/us/en/next-home'
          itemPath='root/responsivegrid/image'/>
        <AEMText
          pagePath='/content/s504-wknd-app/us/en/next-home'
          itemPath='root/responsivegrid/text'/>
      </section>
    </Layout>
  )
}