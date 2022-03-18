import gqlClient from './CommerceGraphQLClient'
import { gql } from '@apollo/client';

async function createEmptyCart() {
  const { data } = await gqlClient.mutate({
    mutation: gql`
mutation {
    createEmptyCart
}`
  });

  return data.createEmptyCart;
}

async function getCartId(req) {
  const cookies = req.cookies;
  let cifCartId;
  if (!cookies.hasOwnProperty('cifCartId')) {
    cifCartId = await createEmptyCart();
    res.setHeader('Set-Cookie', [`cifCartId=${cifCartId}`])
  } else {
    cifCartId = cookies.cifCartId;
  }

  return cifCartId;
}

export async function addToCart(req) {
  const productData = req.body;
  const cifCartId = await getCartId(req);
  const { data } = await gqlClient.mutate({
    mutation: ADD_TO_CART,
    variables: {
      cartId: cifCartId,
      product: productData
    }
  });

  return data.addProductsToCart.cart;
}

export async function removeFromCart(req, itemUid) {
  const cifCartId = await getCartId(req);

  const { data } = await gqlClient.mutate({
    mutation: REMOVE_ITEM,
    variables: {
      cartId: cifCartId,
      itemUid
    }
  });

  return data.removeItemFromCart.cart;
}

export async function queryCart(req) {
  const cifCartId = await getCartId(req);
  const { data } = await gqlClient.query({
    query: MINI_CART_QUERY,
    variables: {
      cartId: cifCartId
    }
  });

  return data.cart;
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
const ADD_TO_CART = gql`
mutation AddProductToCart($cartId: String!, $product: CartItemInput!) {
  addProductsToCart(cartId: $cartId, cartItems: [$product]) {
    cart {
      id
      ...CartTriggerFragment
      ...MiniCartFragment
      __typename
    }
    __typename
  }
}

fragment CartTriggerFragment on Cart {
  id
  total_quantity
  __typename
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
const REMOVE_ITEM = gql`
mutation RemoveItemForMiniCart($cartId: String!, $itemUid: ID!) {
  removeItemFromCart(input: {cart_id: $cartId, cart_item_uid: $itemUid}) {
    cart {
      id
      ...MiniCartFragment
      ...CartPageFragment
      __typename
    }
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

fragment CartPageFragment on Cart {
  id
  total_quantity
  ...AppliedCouponsFragment
  ...GiftCardFragment
  ...ProductListingFragment
  ...PriceSummaryFragment
  __typename
}

fragment AppliedCouponsFragment on Cart {
  id
  applied_coupons {
    code
    __typename
  }
  __typename
}

fragment GiftCardFragment on Cart {
  applied_gift_cards {
    code
    current_balance {
      currency
      value
      __typename
    }
    __typename
  }
  id
  __typename
}

fragment ProductListingFragment on Cart {
  id
  items {
    uid
    product {
      uid
      name
      sku
      url_key
      thumbnail {
        url
        __typename
      }
      small_image {
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
            small_image {
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
    errors {
      code
      message
      __typename
    }
    ... on ConfigurableCartItem {
      configurable_options {
        id
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

fragment PriceSummaryFragment on Cart {
  id
  items {
    uid
    quantity
    __typename
  }
  ...ShippingSummaryFragment
  prices {
    ...TaxSummaryFragment
    ...DiscountSummaryFragment
    ...GrandTotalFragment
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
  ...GiftCardSummaryFragment
  ...GiftOptionsSummaryFragment
  __typename
}

fragment DiscountSummaryFragment on CartPrices {
  discounts {
    amount {
      currency
      value
      __typename
    }
    label
    __typename
  }
  __typename
}

fragment GiftCardSummaryFragment on Cart {
  id
  applied_gift_cards {
    code
    applied_balance {
      value
      currency
      __typename
    }
    __typename
  }
  __typename
}

fragment GiftOptionsSummaryFragment on Cart {
  id
  prices {
    gift_options {
      printed_card {
        value
        currency
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment GrandTotalFragment on CartPrices {
  grand_total {
    currency
    value
    __typename
  }
  __typename
}

fragment ShippingSummaryFragment on Cart {
  id
  shipping_addresses {
    selected_shipping_method {
      amount {
        currency
        value
        __typename
      }
      __typename
    }
    street
    __typename
  }
  __typename
}

fragment TaxSummaryFragment on CartPrices {
  applied_taxes {
    amount {
      currency
      value
      __typename
    }
    __typename
  }
  __typename
}
`
