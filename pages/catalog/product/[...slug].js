import Head from 'next/head';
import { gql } from '@apollo/client';
import { Utils } from '@adobe/aem-react-editable-components';

import client from '../../../lib/CommerceGraphQLClient';
import { GlobalProvider } from '../../../lib/globalContext';
import ResponsiveGrid from '../../../components/AEMResponsiveGrid';
import CommerceProductDetail from '../../../components/CommerceProductDetail';
import styles from '../../../styles/Product.module.css';
import {
    getComponentModel,
    getPageModelWithFallback
} from '../../../lib/pages';
import {
    getNavigationItems,
    NavigationProvider
} from '../../../lib/navigation';

const { NEXT_PUBLIC_AEM_PATH, NEXT_PUBLIC_AEM_HOST } = process.env;

export default function ProductPage({
    aemHost,
    rootPath,
    pagePath,
    product,
    commerceItems,
    pageModel
}) {
    // use fixed paths for demo here
    const headerXFModel = Utils.modelToProps(
        getComponentModel(pageModel, 'root/experiencefragment')
    );
    const topContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'top')
    );
    const bottomContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'bottom')
    );
    const footerXFModel = Utils.modelToProps(
        getComponentModel(pageModel, 'root/experiencefragment_1327121818')
    );

    return (
        <GlobalProvider value={{ aemHost, rootPath }}>
            <NavigationProvider value={commerceItems}>
                <Head>
                    <title>{product.name}</title>
                </Head>
                <ResponsiveGrid
                    {...headerXFModel}
                    model={headerXFModel}
                    pagePath={pagePath}
                    itemPath="root/experiencefragment"
                />
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
                <ResponsiveGrid
                    {...footerXFModel}
                    model={footerXFModel}
                    pagePath={pagePath}
                    itemPath="root/experiencefragment_1327121818"
                />
            </NavigationProvider>
        </GlobalProvider>
    );
}

export async function getStaticPaths(context) {
    const paths = [];
    const query = gql`
        query FetchUrlKeys($currentPage: Int!) {
            products(search: "", currentPage: $currentPage) {
                page_info {
                    total_pages
                }
                items {
                    url_key
                }
            }
        }
    `;
    const executeQuery = async (currentPage = 1) => {
        const response = await client.query({ query, variables: { currentPage } });
        const next = currentPage < response.data.products.page_info.total_pages 
            ? async () => await executeQuery(currentPage + 1)
            : null;

        return [
            response.data.products.items || [],
            next
        ]
    }

    for (let executor = executeQuery, items; executor != null;) {
        [items, executor] = await executor();
        
        for (let item of items) {
            paths.push({ params: { slug: [ item.url_key ] } });
        }
    }

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    const slug = context.params.slug;
    let pagePath =
        `${NEXT_PUBLIC_AEM_PATH}/catalog/product/` + slug.join('/');

    const getCommerceModel = (slug) => {
        return client.query({
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
    };

    const [adobeCommerce, aemModel, commerceItems] = await Promise.all([
        getCommerceModel(slug),
        getPageModelWithFallback(pagePath, NEXT_PUBLIC_AEM_PATH),
        getNavigationItems()
    ]);
    const product = adobeCommerce?.data?.products?.items[0];

    return {
        props: {
            aemHost: NEXT_PUBLIC_AEM_HOST,
            rootPath: NEXT_PUBLIC_AEM_PATH,
            pagePath,
            product,
            pageModel: aemModel,
            commerceItems
        }
    };
}
