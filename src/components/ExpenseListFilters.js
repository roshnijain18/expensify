import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setEndDate, setStartDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState({ calendarFocused })
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group-item">
            <input
              type="text"
              className="text-input clearable"
              placeholder="Search expenses"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group-item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group-item">
            <DateRangePicker
              startDateId="start_date_input"
              endDateId="end_date_input"
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  };
}
const mapStateToProps = (state) => ({filters: state.filters});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (filterValue) => dispatch(setTextFilter(filterValue)),
  sortByDate: (date) => dispatch(sortByDate(date)),
  sortByAmount: (amount) => dispatch(sortByAmount(amount)),
  setStartDate: (date) => dispatch(setStartDate(date)),
  setEndDate: (date) => dispatch(setEndDate(date)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);