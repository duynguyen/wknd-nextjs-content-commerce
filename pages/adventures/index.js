import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { AdventureClient } from '../../lib/adventures';
import ListItem from '../../components/ListItem';

export default function Adventures({ adventures }) {
  const { NEXT_PUBLIC_AEM_HOST } = process.env;
  return (
    <Layout>
      <Head>
        <title>Adventures</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>All adventures</h1>
        <ul className={utilStyles.list}>
          {adventures.map(
            ({
              _path,
              adventureTitle,
              adventureDescription,
              adventurePrimaryImage,
            }) => {
              const pathItems = _path.split('/');
              const path = `/adventures/${pathItems[pathItems.length - 2]}`;
              return (
                <ListItem
                  key={_path}
                  path={path}
                  title={adventureTitle}
                  description={adventureDescription.plaintext}
                  imageSrc={`${NEXT_PUBLIC_AEM_HOST}${adventurePrimaryImage._path}`}
                />
              );
            }
          )}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = AdventureClient.fromEnv();
  const res = await client.getAdventures();
  const adventures = res?.data?.adventureList?.items;
  return {
    props: {
      adventures,
    },
  };
}