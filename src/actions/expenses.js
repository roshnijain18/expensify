//Actions:
import * as uuid from 'uuid';
import * as types from './types';
import axios from 'axios';

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
      .catch(err => {
        dispatch(addExpenseFailure(err.message));
      });
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
export const removeExpense = ({ id } = {}) => ({
  type: types.REMOVE_EXPENSE,
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updatedValue) => ({
  type: types.EDIT_EXPENSE,
  id,
  updatedValue
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: types.SET_EXPENSES,
  expenses
});
