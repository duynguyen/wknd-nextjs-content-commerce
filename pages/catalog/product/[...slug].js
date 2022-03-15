import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../../../lib/CommerceGraphQLClient';
import CommerceProductDetail from '../../../components/CommerceProductDetail';
import styles from '../../../styles/Product.module.css';

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ProductPage({ pagePath, slug, product }) {
    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.content}>
                    <p>AEM Content PlaceHolder</p>
                </div>
                <CommerceProductDetail product={product}/>
                <div className={styles.content}>
                    <p>AEM Content PlaceHolder</p>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog/product`;

    //  TODO: fetch from AEM and Commerce
    //const [adobeCommerce, aem] = await Promise.all([
    const [adobeCommerce] = await Promise.all([
        client.query({
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
        })
    ]);
    const product = adobeCommerce?.data?.products?.items[0];

    return {
        props: {
            pagePath,
            product: product,
            slug: slug.join('/')
        }
    };
}
