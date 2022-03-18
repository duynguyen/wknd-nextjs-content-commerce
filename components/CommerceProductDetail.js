import Image from 'next/image';
import { useState } from 'react';
import { useCartContext } from '../lib/cartContext';
import usePrice from '../lib/use-price';
import styles from '../styles/Product.module.css';

export default function CommerceProductDetail({ product }) {
    const price = usePrice({
        amount: product.price.regularPrice.amount.value,
        currencyCode: product.price.regularPrice.amount.currency,
        locale: 'en-US'
    });

    const [, { dispatch }] = useCartContext();

    const { configurable_options } = product;
    const options = {

    };

    if (configurable_options) {
        configurable_options.forEach(o => {
            options[o.uid] = null;
        });
    }

    const [selection, setSelection] = useState({
        quantity: 1,
        ...options
    });

    const setOption = (optionUid, optionValue) => {
        setSelection({
            ...selection,
            [optionUid]: optionValue
        })
    }

    const updateQuantity = event => {
        setSelection({
            ...selection,
            quantity: parseInt(event.target.value)
        })
    }

    const enableAddToCart = () => {
        return selection.quantity > 0 && Object.keys(selection)
            .filter(k => options.hasOwnProperty(k))
            .reduce((acc, k) => {
                return acc && selection[k] !== null;
            }, true);
    }

    const addToCart = () => {
        fetch('/api/addItemsToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sku: product.sku,
                quantity: selection.quantity,
                selected_options: Object.keys(options).map(k => selection[k])
            })
        })
            .then(response => response.json())
            .then(data => dispatch({ type: 'setCart', cart: data }));
    }

    return (
        <div className={styles.grid}>
            <div className='fake-header'></div>
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
                {product.configurable_options && product.configurable_options.map(o =>
                    <div key={o.uid}>
                        <p>{o.label}</p>
                        <ul>
                            {o.values.map(v =>
                                <li key={v.uid}>
                                    <input defaultChecked={false} checked={selection[o.uid] === v.uid} onChange={() => setOption(o.uid, v.uid)} type="radio" name={o.uid} key={v.uid} value={v.uid} /> {v.label}
                                </li>)}
                        </ul>
                    </div>
                )}
                <p>Quantity <select classname='product-quantity' onChange={updateQuantity} value={selection.quantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select></p>

                <div class="cmp-button--primary">
                    <button onClick={addToCart} disabled={!enableAddToCart()} class="cmp-button">
                        <span class="cmp-button__text">Add to cart</span>
                    </button>
                </div>
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
