import Head from 'next/head'
import Navigation from '../components/Navigation'

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ContentPage({ path }) {
  const pagePath = `${NEXT_PUBLIC_AEM_PATH}`;

  // TODO: render the editable grid

  return (
    <>
      <Head>
        <title>foobar</title>
      </Head>
      <Navigation />
      <article>
        ordinary page:
        {pagePath}
      </article>
    </>
  );
}


export async function getServerSideProps(context) {
  // TODO: fetch model of any content page

  return {
    props: {

    }
  }
}
