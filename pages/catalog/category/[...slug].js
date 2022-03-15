import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "../../../lib/CommerceGraphQLClient";
import utilStyles from "../../../styles/utils.module.css";
import styles from "../../../components/layout.module.css";
import categoryStyles from "../../../styles/Category.module.css";
import usePrice from "../../../lib/use-price";

const { NEXT_PUBLIC_AEM_PATH } = process.env;
const PAGE_SIZE = 6;

export default function CategoryPage({ pagePath, slug, category }) {

    // TODO: render category page

    return (
        <div className={styles.container}>
            <Head>
                <title>{category.name}</title>
            </Head>
            <div className={styles.content}>
                <p>AEM Content PlaceHolder</p>
            </div>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h1 className={utilStyles.headingXl}>{category.name}</h1>
                {  category.image ?
                    (<img
                        height="200px"
                        alt={category.name}
                        src={category.image}
                    />) : ( <span/>)
                }
                <ul>
                    {category.children.map(
                        ({
                             name,
                             url_key,
                         }) => {
                            return (
                                <li><a href={url_key}>{name}</a></li>
                            );
                        }
                    )}
                </ul>
                <div className={categoryStyles.productlist}>
                    {category.products.items.map(
                        ({
                            name,
                            url_key,
                            small_image,
                            price
                         }) => {
                            const href = '../product/' + url_key;
                            const formattedPrice = usePrice({
                                amount: price.regularPrice.amount.value,
                                currencyCode: price.regularPrice.amount.currency,
                                locale: 'en-US'
                            });
                            return (
                                <a href={href} className={categoryStyles.productlist_item}>
                                    <img height="200px" alt={name} src={small_image.url}/>
                                    <div>{name}</div>
                                    <span>{formattedPrice}</span>
                                </a>
                            );
                        }
                    )}
                </div>
                <div className={categoryStyles.pagination}>
                    {
                        new Array(category.products.page_info.total_pages).fill(1).map( (_, i) => {
                            const page = i+1;
                            const href = slug + '?page=' + page;
                            return (<a className={categoryStyles.pagination_item} href={href}>{page}</a>) })
                    }
                </div>
            </section>
            <div className={styles.content}>
                <p>AEM Content PlaceHolder</p>
            </div>
        </div>
    );
}


export async function getServerSideProps(context) {
    const pagePath = `${NEXT_PUBLIC_AEM_PATH}/catalog/category`;
    const slug = context.params.slug;
    const page = context.query.page ? context.query.page : 1;
    const filters = slug == 'root' ? '' : `(filters: {url_key: {eq: "${slug}"}})`;

    const { data } = await client.query({
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
    const category = data?.categoryList[0];

    console.log(category);
//  TODO: fetch from AEM and Commerce
//    const [adobeCommerce, aem] = await Promise.all([
//        fetch(/*adobe commerce*/),
//        fetch(/*aem*/)
//    ])

    return {
        props: {
            pagePath,
            category: category,
            slug: slug.join('/'),
        }
    }
}