import {Utils} from "@adobe/aem-react-editable-components";
import {getComponentModel} from "../lib/pages";
import styles from "./layout.module.css";
import Head from "next/head";
import ResponsiveGrid from "./AEMResponsiveGrid";
import CommerceCategory from "./CommerceCategory";
import client from "../lib/CommerceGraphQLClient";
import {gql} from "@apollo/client";

const PAGE_SIZE = 6;

export default function CommerceCategoryPage({pagePath, slug, category, pageModel}) {

    const topContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'top')
    );
    const bottomContentModel = Utils.modelToProps(
        getComponentModel(pageModel, 'bottom')
    );

    return (
        <div className={styles.container}>
            <Head>
                <title>{category ? category.name : 'Category not Found'}</title>
            </Head>

            <div className={styles.content}>
                <ResponsiveGrid
                    {...topContentModel}
                    model={topContentModel}
                    pagePath={pagePath}
                    itemPath="top"
                />
            </div>

            {category ?
                (<CommerceCategory slug={slug} category={category}/>) : (<span>Category not found.</span>)
            }

            <div className={styles.content}>
                <ResponsiveGrid
                    {...bottomContentModel}
                    model={bottomContentModel}
                    pagePath={pagePath}
                    itemPath="bottom"
                />
            </div>
        </div>
    );
}

export function getCategoryModel(page, slug) {
    const filters = slug ? `(filters: {url_key: {eq: "${slug}"}})` : '';
    return client.query({
        query: gql`{
            categoryList${filters}{
                uid
                url_key
                url_path
                name
                image
                products (currentPage: ${page}, pageSize: ${PAGE_SIZE}){
                    page_info {
                        total_pages
                    }
                    items {
                        name
                        url_key
                        small_image {
                            url
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
                children {
                    name
                    url_key
                }
            }
        }`
    });
}