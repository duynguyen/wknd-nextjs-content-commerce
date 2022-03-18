import categoryStyles from '../styles/Category.module.css';
import usePrice from '../lib/use-price';

export default function CommerceCategory({ category, slug, currentPage }) {
    return (
        <section className={categoryStyles.category_root}>
            {category.image ? (
                <>
                <h1 className={categoryStyles.category_header}>{category.name}</h1>
                <div className={categoryStyles.category_image}>
                    <img alt={category.name} src={category.image} />
                </div>
                </>
            ) : (
                <h1 className={categoryStyles.category_header_no_image}>{category.name}</h1>
            )}
            <div className={categoryStyles.category_body}>
                <div className={categoryStyles.category_children}>
                    <ul>
                        {category.children.map(({ name, url_key }) => {
                            const href = slug ? url_key : 'catalog/' + url_key;
                            return (
                                <li>
                                    <a className={categoryStyles.category_child} href={ href }>{name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
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
                                <a href={href} className={categoryStyles.productlist_item}>
                                    <div className={categoryStyles.productlist_item_image}>
                                        <img height="200px" alt={name} src={small_image.url}/>
                                    </div>
                                    <div className={categoryStyles.productlist_item_title}>{name}</div>
                                    <span className={categoryStyles.productlist_item_price}>{formattedPrice}</span>
                                </a>
                            );
                        }
                    )}
                    {
                        new Array((6 - category.products.items.length % 6) % 6).fill(1).map(() => {
                            return (
                                <a className={categoryStyles.productlist_item}/>
                            );
                        })
                    }
                </div>
                <div className={categoryStyles.pagination}>
                    {
                        new Array(category.products.page_info.total_pages == 1 ? 0 : category.products.page_info.total_pages)
                        .fill(1)
                        .map((_, i) => {
                            const page = i + 1;
                            const href = (slug ? slug : 'catalog') + '?page=' + page;
                            const style = page == currentPage ? categoryStyles.pagination_item_current : categoryStyles.pagination_item;
                            return (
                                <a className={style} href={href}> {page} </a>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
