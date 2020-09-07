import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';

// Temporarily switching API from Cognito auth to API key for simpler testing
Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_ENDPOINT,
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: process.env.REACT_APP_APPSYNC_API_KEY,
});

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
