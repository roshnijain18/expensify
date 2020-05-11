//Actions:
import * as uuid from 'uuid';
import * as types from './types';

// ADD_EXPENSE
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
}) => ({
  type: types.ADD_EXPENSE,
  expense: {
    id: uuid.v4(),
    description,
    note,
    amount,
    createdAt,
  }
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
