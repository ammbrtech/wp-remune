import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

const target = document.getElementById('remune-wrapper');
if (target) { ReactDOM.render(<App />, target); }

//serviceWorker.unregister();
