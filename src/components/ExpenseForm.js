import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'
import { withRouter } from 'react-router-dom';

class ExpenseForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount/100) .toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calenderFocused: false,
      error: ''
    };
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState({description});
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState({note});
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
      this.setState({amount});
  };

  onDateChange = (createdAt) => {
    if(createdAt)
      this.setState({ createdAt });
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calenderFocused: focused }))
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.description || !this.state.amount) {
      //Set error
      this.setState({error: 'Please provide amount & description'});
    } else {
      this.setState({error: ''})
      this.props.onSubmit({
          description: this.state.description,
          amount: parseFloat(this.state.amount, 10) * 100,
          createdAt: this.state.createdAt,
          note: this.state.note
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button" type="submit">Save Expense</button>
          <button className="button button-cancel" type="button" onClick={() => this.props.history.push('/')}>Back</button>
        </div>
      </form>
    )
  };
}

export default withRouter(ExpenseForm);