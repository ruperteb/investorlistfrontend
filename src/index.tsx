import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, mergeStyles } from 'office-ui-fabric-react';
import * as serviceWorker from './serviceWorker';
import { AUTH_TOKEN } from './constants'
import { resolvers, typeDefs } from './resolvers';

import {
  ApolloClient,
  InMemoryCache,
  gql,
  NormalizedCacheObject,
  ApolloProvider,
  ApolloLink,
  HttpLink, useQuery
} from '@apollo/client';


import { cache } from './cache';



/* http://localhost:4000/ */

/* https://investorlistbackend.herokuapp.com/ */



const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://investorlistbackend.herokuapp.com/",
    credentials: 'include',
    headers: {
      authorization: localStorage.getItem('token'),
    },
   /*  fetchOptions: {
      mode: 'no-cors',
    }, */
  }),
 
  typeDefs,
  resolvers: {},


  
});



// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#root)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});


ReactDOM.render(
  <Customizer {...FluentCustomizations}>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </Customizer>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
