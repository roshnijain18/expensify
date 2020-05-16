import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { getExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(getExpenses());

const rootApp =  (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(rootApp, document.getElementById('app'));
