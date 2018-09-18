import React from 'react';
import ReactDOM from 'react-dom';
import 'animate.css';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Page from './Page';
import themeReducer from './store/reducer';

const store = createStore(themeReducer);

ReactDOM.render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
);