import Head from 'next/head'
import {gql} from "@apollo/client";
import client from "../../lib/CommerceGraphQLClient";
import styles from "../../components/layout.module.css";
import CommerceCategory from "../../components/CommerceCategory";
import {Utils} from "@adobe/aem-react-editable-components";
import {getComponentModel, getPageModel} from "../../lib/pages";
import ResponsiveGrid from "../../components/AEMResponsiveGrid";

const {NEXT_PUBLIC_AEM_PATH} = process.env;
const PAGE_SIZE = 6;

export default function CategoryPage({pagePath, slug, category, pageModel}) {

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


export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const page = context.query.page ? context.query.page : 1;
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog/category/` + slug;

    const getCommerceModel = (slug, page) => {
        const filters = slug == 'root' ? '' : `(filters: {url_key: {eq: "${slug}"}})`;
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

    const [commereModel, aemModel] = await Promise.all([
        getCommerceModel(slug, page),
        getPageModel(pagePath)
    ]);


    const category = commereModel?.data?.categoryList.length > 0 ? commereModel?.data?.categoryList[0] : null;

    console.log('Category: ' + category);

    return {
        props: {
            pagePath,
            category: category,
            slug: slug,
            pageModel: aemModel
        }
    };
}