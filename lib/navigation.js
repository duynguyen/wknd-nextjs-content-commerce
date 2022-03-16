import React from 'react';
import gqlClient from '../lib/CommerceGraphQLClient';
import { gql } from '@apollo/client';

export async function getNavigationItems() {
    let commerceNavItems = [];
    const { data, loading } = await gqlClient.query({
        query: gql`
        query GetCategories {
            categoryList {
                uid
                name
                children {
                    uid
                    name
                    url_path
                }
            }
        }
    `
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
