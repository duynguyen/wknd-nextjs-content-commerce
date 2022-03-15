import gqlClient from '../lib/CommerceGraphQLClient';
import { gql } from '@apollo/client';

const Navigation = props => {

    gqlClient.query({
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
    })


    return (<h1>Navigation</h1>)
}

export default Navigation;
