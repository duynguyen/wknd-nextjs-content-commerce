import React, { useEffect, useReducer, useContext } from 'react'

const CartContext = React.createContext();

const reducerFactory = () => {
    return (state, action) => {
        switch (action.type) {
            case 'setCart': {
                return action.cart
            }
            default: {
                return state
            }
        }
    }
}

const CartContextProvider = props => {
    const { children } = props;
    const initialState = {}
    const [cartState, dispatch] = useReducer(reducerFactory(), initialState);

    useEffect(() => {
        async function fetchCart() {
            let response = await fetch('/api/getCartItems')
            response = await response.json()
            dispatch({ type: 'setCart', cart: response })
        }

        fetchCart();
    }, []);

    const contextValue = [
        cartState,
        {
            dispatch
        }
    ];

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export default CartContextProvider;

export const useCartContext = () => useContext(CartContext);
