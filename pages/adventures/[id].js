import Layout from '../../components/layout'
import { AdventureClient } from '../../lib/adventures';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export default function Adventure({ adventure }) {
  const { NEXT_PUBLIC_AEM_HOST } = process.env;
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
        <img
          height="300px"
          alt={adventure.adventureTitle}
          src={`${NEXT_PUBLIC_AEM_HOST}${adventure.adventurePrimaryImage._path}`}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: adventure.adventureDescription.html,
          }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = AdventureClient.fromEnv();
  const paths = await client.getAdventurePaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = AdventureClient.fromEnv();
  const folder = params.id;
  // TODO: rev routing with AEM CF path
  const cf =
    'beervana-portland' === folder
      ? 'beervana-in-portland'
      : 'surf-camp-in-costa-rica' === folder
      ? 'surf-camp-costa-rica'
      : folder;
  const path = `/content/dam/wknd/en/adventures/${folder}/${cf}`;
  const res = await client.getAdventureByPath(path);
  const adventure = res?.data?.adventureByPath?.item;
  return {
    props: {
      adventure,
    },
  };
}