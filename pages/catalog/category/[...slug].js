import Head from 'next/head'

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function CategoryPage({ pagePath, slug }) {

    // TODO: render category page

    return (
        <>
            <Head>
                <title>foobar</title>
            </Head>
            <article>
                {pagePath}<br/>
                {slug}
            </article>
        </>
    );
}


export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog/category`;

//  TODO: fetch from AEM and Commerce
//    const [adobeCommerce, aem] = await Promise.all([
//        fetch(/*adobe commerce*/),
//        fetch(/*aem*/)
//    ])

    return {
        props: {
            pagePath,
            slug: slug.join('/'),
        }
    }
}