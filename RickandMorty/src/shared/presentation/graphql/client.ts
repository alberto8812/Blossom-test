import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";

const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        const hasUnauthorized = error.errors.some(err => err.extensions?.['status'] === 401);
        if (hasUnauthorized) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '';
        }
        error.errors.forEach((err) => {
            console.error(`[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`);
        });
    } else {
        console.error(`[Network error]: ${error}`);
    }
});

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
});

const link = ApolloLink.from([errorLink, httpLink]);

const graphqlClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

export { graphqlClient };
