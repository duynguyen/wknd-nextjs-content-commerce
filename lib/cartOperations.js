import gqlClient from './CommerceGraphQLClient'
import { gql } from '@apollo/client';

export async function queryCart(req) {
    const cookies = req.cookies;
    let cifCartId;
    if (!cookies.hasOwnProperty('cifCartId')) {
        cifCartId = await createEmptyCart();
        res.setHeader('Set-Cookie', [`cifCartId=${cifCartId}`])
    } else {
        cifCartId = cookies.cifCartId;
    }

    const { data } = await gqlClient.query({
        query: MINI_CART_QUERY,
        variables: {
            cartId: cifCartId
        }
    })

    return data.cart;
}

export async function createEmptyCart() {
    const { data } = await gqlClient.mutate({
        mutation: gql`
            mutation {
                createEmptyCart
            }`
    });

    return data.createEmptyCart;
}

const MINI_CART_QUERY = gql`
query MiniCartQuery($cartId: String!) {
  cart(cart_id: $cartId) {
    id
    ...MiniCartFragment
    __typename
  }
}

fragment MiniCartFragment on Cart {
  id
  total_quantity
  prices {
    subtotal_excluding_tax {
      currency
      value
      __typename
    }
    subtotal_including_tax {
      currency
      value
      __typename
    }
    __typename
  }
  ...ProductListFragment
  __typename
}

fragment ProductListFragment on Cart {
  id
  items {
    uid
    product {
      uid
      name
      url_key
      thumbnail {
        url
        __typename
      }
      stock_status
      ... on ConfigurableProduct {
        variants {
          attributes {
            uid
            __typename
          }
          product {
            uid
            thumbnail {
              url
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    prices {
      price {
        currency
        value
        __typename
      }
      __typename
    }
    quantity
    ... on ConfigurableCartItem {
      configurable_options {
        configurable_product_option_uid
        option_label
        configurable_product_option_value_uid
        value_label
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
`
