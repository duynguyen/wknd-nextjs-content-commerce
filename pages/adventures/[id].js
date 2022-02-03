import Layout from '../../components/layout'
import { getAdventurePaths, getAdventureByPath } from '../../lib/adventures'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

const assetServer = 'https://publish-p22654-e59315.adobeaemcloud.com'

export default function Adventure({ adventure }) {
  return (
    <Layout adventure>
      <Head>
        <title>{adventure.adventureTitle}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{adventure.adventureTitle}</h1>
        <div className={utilStyles.lightText}>
          <p>{adventure.adventureType}</p>
        </div>
        <img height="300px" alt={adventure.adventureTitle} src={`${assetServer}${adventure.adventurePrimaryImage._path}`}/>
        <div dangerouslySetInnerHTML={{ __html: adventure.adventureDescription.html }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAdventurePaths()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const folder = params.id
  // TODO: rev routing with AEM CF path
  const cf = ('beervana-portland' === folder) ? 'beervana-in-portland' : (('surf-camp-in-costa-rica' === folder) ? 'surf-camp-costa-rica' : folder)
  const path = `/content/dam/wknd/en/adventures/${folder}/${cf}`
  const res = await getAdventureByPath(path)
  const adventure = res?.data?.adventureByPath?.item
  return {
    props: {
      adventure
    }
  }
}