import { createContext } from "react";

import gqlClient from "../lib/CommerceGraphQLClient";
import { gql } from "@apollo/client";

export const FeaturedCategoriesContext = createContext();

export const FeaturedCategoriesProvider = FeaturedCategoriesContext.Provider;
export const FeaturedCategoriesConsumer = FeaturedCategoriesContext.Consumer;

const GET_FEATURED_CATEGORIES_QUERY = gql`
  query GetFeaturedCategories($urlKeys: [String!]!) {
    categoryList(filters: { url_key: { in: $urlKeys } }) {
      uid
      name
      url_key
      url_path
      products(pageSize: 1) {
        items {
          name
          image {
            url
            label
          }
        }
      }
    }
  }
`;
export async function getFeaturedCategories(categories) {

  const { data, loading } = await gqlClient.query({
    query: GET_FEATURED_CATEGORIES_QUERY,
    variables: {
      urlKeys: categories,
    },
  });

  if (!loading) {
    const { categoryList } = data;
    return categoryList;
  }

  return null;
}
