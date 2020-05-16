// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE_SUCCESS':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE_SUCCESS':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE_SUCCESS':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.expense
          };
        } else {
          return expense;
        };
      });
    case 'GET_EXPENSES_SUCCESS':
      return action.expenses;
    default:
      return state;
  }
};