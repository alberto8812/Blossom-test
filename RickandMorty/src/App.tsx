import { RouterProvider } from "react-router-dom";
import { router } from "./shared/presentation/router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApolloProvider } from "@apollo/client/react";
import { graphqlClient } from "./shared/presentation/graphql/client";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ApolloProvider client={graphqlClient}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
