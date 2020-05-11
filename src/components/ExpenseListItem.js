import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ description, amount, createdAt, id, note }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item-title">{description}</h3>
      <span className="list-item-sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
      <p className="list-item-sub-title">{note}</p>
    </div>
    <h3 className="list-item-data">{numeral(amount / 100).format('$0,0.00')}</h3>
  </Link>
);

export default ExpenseListItem;
  