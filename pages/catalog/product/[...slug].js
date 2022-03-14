import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "../../../lib/CommerceGraphQLClient";

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ProductPage({ pagePath, slug, product }) {

    // TODO: render product page

    return (
        <>
            <Head>
                <title>foobar</title>
            </Head>
            <article>
                {pagePath}<br/>
                {slug}<br />
                SKU: {product.sku}
            </article>
        </>
    );
}


export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog/product`;

    const { data } = await client.query({
        query: gql`{
            products(filter: {url_key: {eq: "${slug}"}}) {
                items {
                    name 
                    sku   
                    description {
                        html
                    }
                    image {
                        url
                        label
                    }
                    price {
                        regularPrice {
                            amount {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }`
    });
    const product = data?.products?.items[0];

    console.log(product)
//  TODO: fetch from AEM and Commerce
//    const [adobeCommerce, aem] = await Promise.all([
//        fetch(/*adobe commerce*/),
//        fetch(/*aem*/)
//    ])

    return {
        props: {
            pagePath,
            product: product,
            slug: slug.join('/'),
        }
    }
}