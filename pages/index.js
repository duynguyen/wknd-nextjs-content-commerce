import Head from 'next/head'
import Navigation from '../components/Navigation'
import { getNavigationItems } from '../lib/navigation';


const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ContentPage({ navigationItems }) {
  const pagePath = `${NEXT_PUBLIC_AEM_PATH}`;

  return (
    <>
      <Head>
        <title>foobar</title>
      </Head>
      <Navigation commerceItems={navigationItems.commerceNavItems} contentItems={navigationItems.contentNavItems} />
      <article>
        ordinary page:
        {pagePath}
      </article>
    </>
  );
}

export async function getServerSideProps(context) {
  const { commerceNavItems, contentNavItems } = await getNavigationItems(NEXT_PUBLIC_AEM_PATH);
  return {
    props: {
      navigationItems: {
        commerceNavItems,
        contentNavItems
      }
    }
  }
}
