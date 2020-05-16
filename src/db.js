const getExpenses = (req, res, db) => {
  db.select('*').from('expenses')
  .then(items => {
    if(items.length){
      res.json(items);
    } else {
      res.json([]);
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}));
}
  
const addExpense = (req, res, db) => {  
  const { id, description, note, amount, createdAt: created_at } = req.body;
  db('expenses').insert({id, description, note, amount, created_at})
  .returning('*')
  .then(item => {
    res.json(item[0]);
  })
  .catch(err => res.status(400).json({dbError: 'db error'}));        
}
  
const editExpense = (req, res, db) => {
  const { id } = req.params;
  const { description, note, amount, createdAt: created_at } = req.body.updatedValue;
  db('expenses').where({id}).update({id, description, note, amount, created_at})
  .returning('*')
  .then(item => {
    res.json(item[0]);
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}
  
const deleteExpense = (req, res, db) => {
  const { id } = req.params;
  db('expenses').where({id}).del()
  .then(() => {
    res.end()
  })
  .catch(err => res.status(400).json({dbError: 'db error'}));
}

module.exports = {
  getExpenses,
  addExpense,
  editExpense,
  deleteExpense
};
