import Head from 'next/head'

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ContentPage({ path }) {
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}`;

    // TODO: render the editable grid

    return (
        <>
            <Head>
                <title>Product Catalog</title>
            </Head>
            <article>
                <a href='catalog/category/root'>Default Category</a>
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