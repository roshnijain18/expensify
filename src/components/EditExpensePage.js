import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Edit Expense</h1>
      </div>
    </div>
    <div className="content-container">
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          props.editExpense(props.expense.id, expense);
          props.history.push('/');
        }}
      />
      <button className="button button-secondary" onClick={() => {
        props.removeExpense({ id: props.expense.id });
        props.history.push('/');
      }}>Remove Expense</button>
    </div>
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id )
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (id) => dispatch(removeExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);