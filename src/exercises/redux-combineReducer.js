import {createStore, combineReducers } from 'redux';
import * as uuid from 'uuid';

//Actions:
// ADD_EXPENSE
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid.v4(),
        description,
        note,
        amount,
        createdAt,
    }
});
// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updatedValue) => ({
    type: 'EDIT_EXPENSE',
    id,
    updatedValue
})
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// there could be two reducers for managing expenses and filters resp.
// Expenses Reducer

const expensesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id }) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updatedValue
                    }
                } else {
                    return expense;
                }
            })
        default:
            return state;
    }
};

// Filters reducer
// default state = text => '', sortBy => 'date, startDate = undefined, endDate = undefined
const defaultFiltersState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};

const filtersReducer = (state = defaultFiltersState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

// store creation
const store =  createStore(combineReducers(
    {
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);

store.subscribe(() => {
    console.log('Expenses:', store.getState());
})

const expenseOne = store.dispatch(addExpense({description: 'car services', note: 'winter tyres change', amount: 2000 } ));
const expenseTwo = store.dispatch(addExpense({description: 'coffee', amount: 500 } ));
store.dispatch(removeExpense({id: expenseTwo.expense.id}));
store.dispatch(editExpense(expenseOne.expense.id, {amount: 3000}))

const initialState = {
    expenses: [{
        id: 'ueqyuiyqiy',
        description: 'Jan rent',
        note: 'last payment for Victoria address',
        amount: 700000,
        createdAt: 0 
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',  //date or amount
        startDate: undefined,
        endDate: undefined
    }
};