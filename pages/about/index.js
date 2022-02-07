import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

import ResponsiveGrid from '../../components/AEMResponsiveGrid'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ResponsiveGrid
          pagePath='/content/s504-wknd-app/us/en/about'
          itemPath='root/responsivegrid'/>
      </section>
    </Layout>
  )
}