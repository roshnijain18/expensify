//Actions:
import * as uuid from 'uuid';
import * as types from './types';
import axios from 'axios';
import { createStore } from 'redux';

// ADD_EXPENSE
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
}) => {
  const id = uuid.v4();
  return dispatch => {
    dispatch(addExpenseStarted());
    axios
      .post(`http://localhost:9000/expense`, {
        id,
        description,
        note,
        amount,
        createdAt
      })
      .then(res => {
        dispatch(addExpenseSuccess(res.data));
      })
      .catch(err => dispatch(addExpenseFailure(err.message)));
  };
};

const addExpenseSuccess = expense => ({
  type: types.ADD_EXPENSE_SUCCESS,
  expense
});

const addExpenseStarted = () => ({
  type: types.ADD_EXPENSE_STARTED
});

const addExpenseFailure = error => ({
  type: types.ADD_EXPENSE_FAILURE,
  error
});

// REMOVE_EXPENSE
export const removeExpense = ( { id } = {} ) => {
  return dispatch => {
    dispatch(removeExpenseStarted());
    axios
      .delete(`http://localhost:9000/expense/${id}`)
      .then(res => {
        dispatch(removeExpenseSuccess(id));
      })
      .catch(err => dispatch(removeExpenseFailure(err.message)));
  };
};

const removeExpenseSuccess = (id) => ({
  type: types.REMOVE_EXPENSE_SUCCESS,
  id
});

const removeExpenseStarted = () => ({
  type: types.REMOVE_EXPENSE_STARTED
});

const removeExpenseFailure = error => ({
  type: types.REMOVE_EXPENSE_FAILURE,
  error
});

// EDIT_EXPENSE
export const editExpense = (
  id,
  updatedValue
) => {
  return dispatch => {
    dispatch(editExpenseStarted());
    axios
      .put(`http://localhost:9000/expense/${id}`, {
        updatedValue
      })
      .then(res => {
        dispatch(editExpenseSuccess(id, res.data));
      })
      .catch(err => dispatch(editExpenseFailure(err.message)));
  };
};

const editExpenseSuccess = (id, expense) => ({
  type: types.EDIT_EXPENSE_SUCCESS,
  id,
  expense
});

const editExpenseStarted = () => ({
  type: types.EDIT_EXPENSE_STARTED
});

const editExpenseFailure = error => ({
  type: types.EDIT_EXPENSE_FAILURE,
  error
});

// GET_EXPENSES
export const getExpenses = () => {
  return dispatch => {
    dispatch(getExpensesStarted());
    axios
      .get(`http://localhost:9000/expenses`)
      .then(res => {
        dispatch(getExpensesSucess(res.data));
      })
      .catch(err => dispatch(getExpensesFailure(err.message)));
  };
};

const getExpensesSucess = expenses => ({
  type: types.GET_EXPENSES_SUCESS,
  expenses
});

const getExpensesStarted = () => ({
  type: types.GET_EXPENSES_STARTED
});

const getExpensesFailure = error => ({
  type: types.GET_EXPENSES_FAILURE,
  error
});
