import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink, Observable } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './react/routes';
import {ApolloClient} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';


const cache = new InMemoryCache();

const request = async (operation) => {
  const token = await localStorage.getItem('token');
  const refreshToken = await localStorage.getItem('refreshToken');
  operation.setContext({
    headers: {
      'x-token': token ? token : "",
      'x-refresh-token': refreshToken ? refreshToken : ""
    }
  });
};





const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);






const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        // logoutUser();
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true,
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected }});
            return null;
          }
        }
      },
      cache
    }),
    new HttpLink({
      uri: 'http://localhost:3050/graphql',
      credentials: 'omit'
    })
  ]),
  cache
});




const App = () => (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
  );


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
