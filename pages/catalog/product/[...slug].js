import Head from 'next/head';
import { gql } from '@apollo/client';
import { Utils } from '@adobe/aem-react-editable-components';

import client from '../../../lib/CommerceGraphQLClient';
import { GlobalProvider } from '../../../lib/globalContext';
import ResponsiveGrid from '../../../components/AEMResponsiveGrid';
import CommerceProductDetail from '../../../components/CommerceProductDetail';
import styles from '../../../styles/Product.module.css';
import { getComponentModel, getPageModel } from '../../../lib/pages';
import { getNavigationItems, NavigationProvider } from '../../../lib/navigation';

const { NEXT_PUBLIC_AEM_PATH, NEXT_PUBLIC_AEM_HOST } = process.env;

export default function ProductPage({ aemHost, rootPath, pagePath, product, commerceItems, pageModel }) {
    const headerXFModel = Utils.modelToProps(
        getComponentModel(pageModel, 'experiencefragment-header')
    );
    const topContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'top')
    );
    const bottomContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'bottom')
    );
    const footerXFModel = Utils.modelToProps(
        getComponentModel(pageModel, 'experiencefragment-header')
    );

    return (
        <GlobalProvider value={{ aemHost, rootPath }}>
            <NavigationProvider value={commerceItems}>
                <Head>
                    <title>{product.name}</title>
                </Head>
                {
                    <ResponsiveGrid
                        {...headerXFModel}
                        model={headerXFModel}
                        pagePath={pagePath}
                        itemPath="experiencefragment-header"
                    />
                }
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
                    itemPath="experiencefragment-footer"
                />
            </NavigationProvider>
        </GlobalProvider>
    );
}

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const pagePath =
        `${NEXT_PUBLIC_AEM_PATH}/catalog/product/` + slug.join('/');

    const [adobeCommerce, aemModel, commerceItems] = await Promise.all([
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
        getPageModel(pagePath),
        getNavigationItems()
    ]);
    const product = adobeCommerce?.data?.products?.items[0];


    console.log(aemModel);

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
