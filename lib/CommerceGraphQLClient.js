import { ApolloClient, InMemoryCache } from '@apollo/client';

const { NEXT_PUBLIC_COMMERCE_GRAPHQL_ENDPOINT } = process.env;

const client = new ApolloClient({
    uri: NEXT_PUBLIC_COMMERCE_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
});

export default client;
