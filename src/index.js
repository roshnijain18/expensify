const express = require("express");
const path = require("path");
const api = require('./api');
const bodyParser = require('body-parser');

// db Connection w/ localhost
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: 5432,
    user : '',
    password : '',
    database : 'expensifydb'
  }
});


const app = express();
const port = process.env.PORT || "9000";
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
app.use(bodyParser.json()) // handle json data

// App Routes - Auth
app.get('/expenses', (req, res) => api.getExpenses(req, res, db))
app.post('/expense', (req, res) => api.addExpense(req, res, db))
app.put('/expense/:id', (req, res) => api.editExpense(req, res, db))
app.delete('/expense/:id', (req, res) => api.deleteExpense(req, res, db))

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});