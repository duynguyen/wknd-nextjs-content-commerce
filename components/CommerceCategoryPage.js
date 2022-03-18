import {Utils} from "@adobe/aem-react-editable-components";
import {getComponentModel} from "../lib/pages";
import styles from "./layout.module.css";
import Head from "next/head";
import ResponsiveGrid from "./AEMResponsiveGrid";
import CommerceCategory from "./CommerceCategory";
import client from "../lib/CommerceGraphQLClient";
import {gql} from "@apollo/client";
import {NavigationProvider} from "../lib/navigation";
import categoryStyles from '../styles/Category.module.css';

const PAGE_SIZE = 6;

export default function CommerceCategoryPage({pagePath, category, navigationModel, pageModel, currentPage, slug}) {

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
        <NavigationProvider value={navigationModel}>

            <Head>
                <title>{category ? category.name : 'Category not Found'}</title>
            </Head>

            <ResponsiveGrid
                {...headerXFModel}
                model={headerXFModel}
                pagePath={pagePath}
                itemPath="experiencefragment-header"
            />

            <main className={categoryStyles.main}>

                <div className={styles.content}>
                    <ResponsiveGrid
                        {...topContentModel}
                        model={topContentModel}
                        pagePath={pagePath}
                        itemPath="top"
                    />
                </div>

                {category
                    ?
                    (<CommerceCategory slug={slug} category={category} currentPage={currentPage}/>)
                    :
                    (<span>Category not found.</span>)
                }

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