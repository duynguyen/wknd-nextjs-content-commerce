import utilStyles from '../styles/utils.module.css';
import categoryStyles from '../styles/Category.module.css';
import usePrice from '../lib/use-price';

export default function CommerceCategory({ category, slug }) {
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h1 className={utilStyles.headingXl}>{category.name}</h1>
            {category.image ? (
                <img height="200px" alt={category.name} src={category.image} />
            ) : (
                <span />
            )}
            <ul>
                {category.children.map(({ name, url_key }) => {
                    const href = slug ? url_key : 'catalog/' + url_key;
                    return (
                        <li>
                            <a href={ href }>{name}</a>
                        </li>
                    );
                })}
            </ul>
            <div className={categoryStyles.productlist}>
                {category.products.items.map(
                    ({ name, url_key, small_image, price }) => {
                        const href = '/catalog/product/' + url_key;
                        const formattedPrice = usePrice({
                            amount: price.regularPrice.amount.value,
                            currencyCode: price.regularPrice.amount.currency,
                            locale: 'en-US'
                        });
                        return (
                            <a
                                href={href}
                                className={categoryStyles.productlist_item}
                            >
                                <img
                                    height="200px"
                                    alt={name}
                                    src={small_image.url}
                                />
                                <div>{name}</div>
                                <span>{formattedPrice}</span>
                            </a>
                        );
                    }
                )}
            </div>
            <div className={categoryStyles.pagination}>
                {new Array(category.products.page_info.total_pages)
                    .fill(1)
                    .map((_, i) => {
                        const page = i + 1;
                        const href = (slug ? slug : 'catalog') + '?page=' + page;
                        return (
                            <a
                                className={categoryStyles.pagination_item}
                                href={href}
                            >
                                {page}
                            </a>
                        );
                    })}
            </div>
        </section>
    );
}
