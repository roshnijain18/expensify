
import {createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import moment from 'moment';
import * as uuid from 'uuid';

const initialState = {
  expenses: [{
      id: uuid.v4(),
      description: 'Jan rent',
      note: 'last payment for Victoria address',
      amount: 190000,
      createdAt: moment(),
  }],
  filers: {
      text: 'rent',
      sortBy: 'amount',  //date or amount
      startDate: undefined,
      endDate: undefined
  }
};

// store creation
export default () => {
  const store =  createStore(combineReducers(
    {
      expenses: expensesReducer,
      filters: filtersReducer,
    }
  ), initialState );
  return store;
};
