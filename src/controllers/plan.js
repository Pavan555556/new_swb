const  Plan  = require("../models/plans");

//create plan
async function create(req, res) {
  try {
    const { name, description, duration, return_value } = req.body;
    if (!name || duration < 0 || return_value < 0.01) {
      return res.status(400).send({ message: "please enter correct value" });
    }
    const newPlan = await Plan.create({
      name,
      description,
      duration,
      return_value,
    });
    res.status(202).send(newPlan);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "plan not created" });
  }
}

//fetching all plans with pagination
async function fetchAll(req, res) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    // Fetch paginated plans
    const { count, rows } = await Plan.findAndCountAll({
      limit,
      offset,
      order: [['plan_id', 'ASC']] // Order by plan_id ascending
    });

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    // Send the paginated result
    res.status(200).json({
      totalPages,
      currentPage: page,
      plans: rows
    });
  } 
  catch(error){
    res.status(500).send({ message: "failed to find all plans" });
  }
}

module.exports = {
  fetchAll,
  create,
};