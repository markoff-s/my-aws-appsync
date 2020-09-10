import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';

// Cognito access
Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_ENDPOINT,
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_cognito_identity_pool_id: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  aws_user_pools_id: process.env.REACT_APP_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},
});

// API key access
// Amplify.configure({
//   aws_project_region: 'us-east-1',
//   aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_ENDPOINT,
//   aws_appsync_region: 'us-east-1',
//   aws_appsync_authenticationType: 'API_KEY',
//   aws_appsync_apiKey: process.env.REACT_APP_APPSYNC_API_KEY,
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
