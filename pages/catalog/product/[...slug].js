import Head from 'next/head';
import { gql } from '@apollo/client';
import { Utils } from '@adobe/aem-react-editable-components';

import client from '../../../lib/CommerceGraphQLClient';
import ResponsiveGrid from '../../../components/AEMResponsiveGrid';
import CommerceProductDetail from '../../../components/CommerceProductDetail';
import styles from '../../../styles/Product.module.css';
import { getComponentModel, getPageModel } from '../../../lib/pages';

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function ProductPage({ pagePath, product, pageModel }) {

    const topContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'top')
    );
    const bottomContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'bottom')
    );

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.content}>
                    <ResponsiveGrid
                        {...topContentModel}
                        model={topContentModel}
                        pagePath={pagePath}
                        itemPath="top"
                    />
                </div>
                <CommerceProductDetail product={product} />
                <div className={styles.content}>
                    <ResponsiveGrid
                        {...bottomContentModel}
                        model={bottomContentModel}
                        pagePath={pagePath}
                        itemPath="bottom"
                    />
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    console.log(context);
    const slug = context.params.slug;



    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog/product/` + slug.join('/');

    const [adobeCommerce, aemModel] = await Promise.all([
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
        }),
        getPageModel(pagePath)
    ]);
    const product = adobeCommerce?.data?.products?.items[0];

    return {
        props: {
            pagePath,
            product,
            pageModel: aemModel
        }
    };
}
