const Investment = require("../models/investments");
const User = require("../models/users")

const getInvestmentByUserId = async (req, res) => {
    const userId = req.params.userId;
    const { page = 1, pageSize = 10 } = req.query; 
    if (!userId) {
        return res.status(400).json({ message: "UserId Required" });
    }
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const offset = (page - 1) * pageSize; 
        const investments = await Investment.findAll({
            where: { user_id: userId },
            limit: parseInt(pageSize), 
            offset: parseInt(offset) 
        });
        res.json(investments);
    } catch (error) {
        console.error('Error retrieving investments:', error);
        res.status(500).json({ message: 'Failed to retrieve investments' });
    }
};

// Sample investment data
const newInvestmentData = {
    user_id: 1,
    plan_id: 1,
    sip_amount: 1000,
    start_date: new Date('2024-04-15'),
    end_date: new Date('2024-07-15'),
    total_amount: 3000,
    sip_frequency: 'Monthly'
};
  

const createInvestment = async (investmentData) => {
    try {
        const newInvestment = await Investment.create(investmentData);
        return newInvestment;
    } 
    catch (error) {
          console.error('Error creating investment:', error);
          throw new Error('Failed to create investment');
    }
};

//  createInvestment(newInvestmentData)
//  .then((newInvestment) => {
//    console.log('New investment created:', newInvestment);
//  })
//  .catch((error) => {
//    console.error('Error creating investment:', error);
//  });
 
  module.exports = { getInvestmentByUserId };