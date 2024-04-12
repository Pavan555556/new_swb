const { Transaction } = require('../models/transactions')

//fetching transactions by user id
async function fetch(req, res){
  try {
    const { userId } = req.params
    const transactions = await Transaction.findAll({
      where: { user_id: userId }
    })
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found with the given user ID' })
    }
    res.json(transactions)
  } catch (error) {
    res.send(error)
  }
};

//creating transaction
async function create(req,res){
    try{
        const { investment_id, user_id, transaction_type, amount, transaction_date } = req.body;
        const newTransaction = await Transaction.create({
            investment_id,
            user_id,
            transaction_type,
            amount,
            transaction_date
        });
    res.status(201).json(newTransaction);
    }
    catch(error){
        res.send(error)
    }
}

module.exports = {
  fetch,create
};