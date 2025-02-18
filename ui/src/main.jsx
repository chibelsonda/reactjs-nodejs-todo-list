import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import App from "./App.jsx";
import { onError } from "@apollo/client/link/error";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tasks: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const authLink = setContext((_, { headers }) => {
  const user = store.getState().user.user;
  return {
    headers: {
      ...headers,
      authorization: user?.jwt_token ? `Bearer ${user.jwt_token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) =>
      alert(`[GraphQL error]: ${message}`)
    );
  if (networkError) alert(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

const client = new ApolloClient({
  cache,
  link: from([errorLink, authLink.concat(httpLink)]),
});

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
