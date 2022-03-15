import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "../../../lib/CommerceGraphQLClient";
import utilStyles from "../../../styles/utils.module.css";
import Layout from "../../../components/layout";
import ListItem from "../../../components/ListItem";
import styles from "../../../components/layout.module.css";

const { NEXT_PUBLIC_AEM_PATH } = process.env;
const PAGE_SIZE = 10;

export default function CategoryPage({ pagePath, slug, category }) {

    // TODO: render category page

    return (
        <div className={styles.container}>
            <Head>
                <title>foobar</title>
            </Head>
            <div className={styles.content}>
                <p>AEM Content PlaceHolder</p>
            </div>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h1 className={utilStyles.headingXl}>{category.name}</h1>
                <img
                    height="200px"
                    alt={category.name}
                    src={category.image}
                />
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
                {category.products.items.map(
                    ({
                        name,
                        url_key,
                        small_image
                     }) => {
                        const href = '../product/' + url_key;
                        return (
                            <ListItem path={href} title={name} imageSrc={small_image.url}/>
                        );
                    }
                )}
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
    const filters = slug == 'root' ? '' : `(filters: {url_key: {eq: "${slug}"}})`;

    const { data } = await client.query({
        query: gql`{
          categoryList${filters}{
            uid
            url_key
            url_path
            name
            image
            products (currentPage: 1, pageSize: ${PAGE_SIZE}){
              items {
                name
                url_key
                small_image {
                    url
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