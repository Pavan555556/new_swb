const express = require("express");
const {sequelize} = require("./config/db");
const bodyParser = require("body-parser");
const user = require('./routes/user');
const investment = require("./routes/investment");
const planRouter = require("./routes/plan");
const transactionRouter = require("./routes/transaction")

const app = express();
app.use(bodyParser.json());

app.use("/plan",planRouter)
app.use("/transaction",transactionRouter)
app.use("/users", user);
app.use("/investments", investment);

app.get('/', (req, res) => {
    res.send("Hello Moto");
})


// app.use('/plans', plan);
// app.post('/signup', async (req, res) => {
//     const {name, email, password} = req.body;
//     const createdUser = await  DummyUser.create({name, email, password});
//     res.send(createdUser);
// })

// app.get('/getall', async(req, res) => {
//     const allUsers = await DummyUser.findAll();
//     res.json(allUsers);
// })

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listning at ${port}`);
})