const express = require('express');
require('dotenv').config();
const brandRoutes = require('./src/routes/brandRoutes');
const userRoutes = require('./src/routes/userRoutes')
const productRoutes = require('./src/routes/productRoutes')
const employeeRoutes = require('./src/routes/employeeRoutes')

//creat tables
const createEmployeeTable = require('./src/models/employeeModel');
const createUserTable = require('./src/models/userModel');
const createProductsTable = require('./src/models/productModel');
const createProducingTable = require('./src/models/producting');

createEmployeeTable().then(r => console.log(r));
createUserTable().then(r => console.log(r));
createProductsTable().then(r => console.log(r));
createProducingTable().then(r => console.log(r));


const app = express();
const port = 3002;




app.use(express.json());


app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/product', productRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});

