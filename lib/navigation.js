import { getPageModel, getComponentModel } from '../lib/pages'
import gqlClient from '../lib/CommerceGraphQLClient';
import { gql } from '@apollo/client';

export async function getNavigationItems(pagePath) {
    const model = await getPageModel(pagePath)
    let commerceNavItems = [];
    const navigationModel = getComponentModel(model, 'root/experiencefragment/root/container/container_1195249223/navigation');

    const contentNavItems = navigationModel.items[0]?.children.map(c => ({
        path: c.path.replace(pagePath, ''),
        id: c.id,
        title: c.title
    }));

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

    return {
        commerceNavItems,
        contentNavItems
    }
}
