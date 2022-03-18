import React, { useState } from 'react';
import { useCartContext } from '../lib/cartContext';
import usePrice from '../lib/use-price';

const MiniCart = props => {
    const [open, setOpen] = useState(false);
    const [cart, { dispatch }] = useCartContext();
    console.log('cart', cart);

    const count = cart.items ? cart.total_quantity : 0;

    const toggleMiniCart = () => {
        setOpen(!open);
    }

    const removeItem = (itemUid) => {
        fetch(`/api/removeItemFromCart?itemUid=${itemUid}`)
            .then(response => response.json())
            .then(data => dispatch({ type: 'setCart', cart: data }));
    }

    const cartTotal = count > 0 ? (<div className='minicart-total'>
        <b>Total</b>
        <span>{usePrice({
            amount: cart.prices.subtotal_excluding_tax.value,
            currencyCode: cart.prices.subtotal_excluding_tax.currency,
            locale: 'en-US'
        })}</span>
    </div>) : null;

    const minicartBody = (open ?
        <div className='minicart-body'>
            <div className='minicart-item-list'>
                {count > 0 && cart.items.map(i => (
                    <div key={i.uid} className="minicart-item" aria-current="true">
                        <img src={i.product.thumbnail.url} width="128" />
                        <div className="minicart-item-details">
                            <div>
                                <h4 className='minicart-item-title'>{i.product.name}</h4>
                                {i.configurable_options.map(o => (
                                    <p key={o.configurable_product_option_value_uid} className='minicart-item-text'>
                                        <b>{o.option_label}:</b> {o.value_label}
                                    </p>
                                ))}
                                <p className='minicart-item-text'><b>Qty: </b> {i.quantity}</p>
                                <p><b>Price:</b> {
                                    usePrice({
                                        amount: i.prices.price.value,
                                        currencyCode: i.prices.price.currency,
                                        locale: 'en-US'
                                    })}</p>
                            </div>
                            <div className='minicart-item-delete' onClick={() => removeItem(i.uid)}>
                                <i className='wknd__icon wkndicon-delete'></i>
                            </div>
                        </div>
                    </div>

                ))} {
                    count == 0 && <h4 className='minicart-empty'>Cart is empty</h4>
                }

                {cartTotal}
            </div>
        </div> : null
    )

    return <>
        <span className='minicart-header cmp-button--primary' onClick={toggleMiniCart}>
            <span class="cart-count cmp-button">
                <i className='wknd__icon wkndicon-cart'></i>
                <span>{count}</span>
            </span>
        </span>
        {minicartBody}
    </>
}

export default MiniCart;