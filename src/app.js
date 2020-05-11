import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import moment from 'moment';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 3500, createdAt: moment() }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: moment() }));
store.dispatch(addExpense({ description: 'rent', amount: 220000, createdAt: moment() }));

const state = store.getState();

getVisibleExpenses(state.expenses, state.filters);

const rootApp =  (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(rootApp, document.getElementById('app'));