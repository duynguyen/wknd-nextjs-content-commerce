import Head from 'next/head';
import { gql } from '@apollo/client';
import { Utils } from '@adobe/aem-react-editable-components';

import client from '../../../lib/CommerceGraphQLClient';
import ResponsiveGrid from '../../../components/AEMResponsiveGrid';
import CommerceProductDetail from '../../../components/CommerceProductDetail';
import MiniCart from '../../../components/MiniCart';
import styles from '../../../styles/Product.module.css';
import {
    getComponentModel,
    getPageModelWithFallback
} from '../../../lib/pages';
import {
    getNavigationItems,
    NavigationProvider
} from '../../../lib/navigation';
import { ExperienceFragment } from "../../../components/AEMExperienceFragment";

export default function ProductPage({
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
        <div className='root'>
            <NavigationProvider value={commerceItems}>
                <Head>
                    <title>{product.name}</title>
                </Head>
                <MiniCart />
                <ExperienceFragment {...headerXFModel} />
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
                <ExperienceFragment {...footerXFModel} />
            </NavigationProvider>
        </div>
    );
}

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const rootPath = process.env.NEXT_PUBLIC_AEM_PATH
    let pagePath = `${rootPath}/catalog/product/` + slug.join('/');

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
                        ...on ConfigurableProduct {
                            configurable_options {
                                attribute_code
                                label
                                uid
                                values {
                                    label
                                    uid
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
        getPageModelWithFallback(pagePath, rootPath),
        getNavigationItems()
    ]);
    const product = adobeCommerce?.data?.products?.items[0];

    return {
        props: {
            pagePath,
            product,
            pageModel: aemModel,
            commerceItems
        }
    };
}
