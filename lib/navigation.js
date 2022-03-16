import React from 'react';
import gqlClient from '../lib/CommerceGraphQLClient';
import { gql } from '@apollo/client';

export async function getNavigationItems() {
    let commerceNavItems = [];
    const { data, loading } = await gqlClient.query({
        query: gql`
        query GetCategories($rootCategory: String!) {
            categoryList(filters: {category_uid: {eq: $rootCategory}}) {
                children {
                    uid
                    name
                    url_path
                }
            }
        }
    `, variables: { rootCategory: "Mg==" }
    });

    if (!loading) {
        const { categoryList } = data;
        if (categoryList.length > 0) {
            commerceNavItems = categoryList[0].children;
        }
    }

    return commerceNavItems;
}

export const NavigationContext = React.createContext()

export const NavigationProvider = NavigationContext.Provider
export const NavigationConsumer = NavigationContext.Consumer
