import gqlClient from '../lib/CommerceGraphQLClient';
import { gql } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';

const Navigation = props => {
    const [commerceCategories, setCommerceCategories] = useState(null);

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
    }).then(result => {
        const { data, loading } = result;
        if (!loading) {
            const { categoryList } = data;
            if (categoryList.length > 0) {
                setCommerceCategories(categoryList[0].children);
            }
        }
    });

    if (commerceCategories === null) {
        return <div></div>;
    }

    return <ul>
        {commerceCategories.map(c => <li key={c.uid}><Link href={`/catalog/category/${c.url_path}`}>{c.name}</Link></li>)}
    </ul>;

}

export default Navigation;
