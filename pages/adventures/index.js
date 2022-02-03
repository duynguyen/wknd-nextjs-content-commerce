import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getAdventures } from '../../lib/adventures'
import Link from 'next/link'

const assetServer = 'https://publish-p22654-e59315.adobeaemcloud.com'

export default function Adventures({ adventures }) {
  return (
    <Layout home>
      <Head>
        <title>Adventures</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>All adventures</h2>
        <ul className={utilStyles.list}>
          {adventures.map(({ _path, adventureTitle, adventureDescription, adventurePrimaryImage }) => {
            const pathItems = _path.split("/")
            const path = `/adventures/${pathItems[pathItems.length - 2]}`
            return (
              <div key={_path}>
                <Link href={path}><a>
                  <h1>{adventureTitle}</h1>
                </a></Link>
                <img height="300px" alt={adventureTitle} src={`${assetServer}${adventurePrimaryImage._path}`}/>
                <p>{adventureDescription.plaintext}</p>
              </div>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await getAdventures()
  const adventures = res?.data?.adventureList?.items
  return {
    props: {
      adventures
    }
  }
}