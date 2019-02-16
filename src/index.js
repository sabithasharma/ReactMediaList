/**
 * @name - Index
 * @description - Main file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie11';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
