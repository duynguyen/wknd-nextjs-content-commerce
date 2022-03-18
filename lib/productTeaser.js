import {createContext } from 'react'

import gqlClient from "../lib/CommerceGraphQLClient";
import { gql } from "@apollo/client";

export const ProductTeaserContext = createContext();

export const ProductTeaserProvider = ProductTeaserContext.Provider;
export const ProductTeaserConsumer = ProductTeaserContext.Consumer;

const PRODUCT_TEASER_QUERY = gql`
  query GetProductTeaser($skuList: [String!]!) {
    products(filter: { sku: { in: $skuList } }) {
      items {
        name
        sku
        url_key
        image {
          url
          label
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
  }
`;

export async function getProductTeasersData(skuList) {

  if(!skuList || skuList.length < 1){
    return null;
  }

  const { data, loading } = await gqlClient.query({
    query: PRODUCT_TEASER_QUERY,
    variables: {
      skuList: skuList,
    },
  });

  if (!loading) {
    const { products } = data;
    return products;
  }

  return null;
}