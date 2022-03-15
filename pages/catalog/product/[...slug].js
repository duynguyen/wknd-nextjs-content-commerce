import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../../../lib/CommerceGraphQLClient';
import usePrice from '../../../lib/use-price';
import styles from '../../../styles/Product.module.css';

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ProductPage({ pagePath, slug, product }) {

    const price = usePrice({
        amount: product.price.regularPrice.amount.value,
        currencyCode: product.price.regularPrice.amount.currency,
        locale: 'en-US'
    });

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.content}>
                    <p>AEM Content PlaceHolder</p>
                </div>
                <div className={styles.grid}>
                    <div className={styles.name}>
                        <h1>{product.name}</h1>
                    </div>
                    <div className={styles.image}>
                        <Image
                            src={product.image.url}
                            alt={product.image.label}
                            width="500"
                            height="600"
                        />
                    </div>
                    <div className={styles.details}>
                        <p>
                            Price: <span>{price}</span>
                        </p>
                        <p>
                            Sku: <span>{product.sku}</span>
                        </p>
                    </div>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html: product.description.html
                        }}
                    />
                </div>
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
