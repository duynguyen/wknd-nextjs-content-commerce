import Image from 'next/image';
import usePrice from '../lib/use-price';
import styles from '../styles/Product.module.css';

export default function CommerceProductDetail({ product }) {
    const price = usePrice({
        amount: product.price.regularPrice.amount.value,
        currencyCode: product.price.regularPrice.amount.currency,
        locale: 'en-US'
    });
    return (
        <div className={styles.grid}>
            <div className={styles.name}>
                <h1>{product.name}</h1>
            </div>
            <div className={styles.image}>
                <Image
                    src={product.image.url}
                    alt={product.image.label}
                    width="500"
                    height="600"
                />
            </div>
            <div className={styles.details}>
                <p>
                    Price: <span>{price}</span>
                </p>
                <p>
                    Sku: <span>{product.sku}</span>
                </p>
            </div>
            <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                    __html: product.description.html
                }}
            />
        </div>
    );
}
