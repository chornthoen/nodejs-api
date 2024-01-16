const express = require('express');
require('dotenv').config();
const brandRoutes = require('./src/routes/brandRoutes');
const userRoutes = require('./src/routes/userRoutes')
const productRoutes = require('./src/routes/productRoutes')
const createEmployeeTable = require('./src/models/employee_model');

createEmployeeTable().then(r => console.log(r));


const app = express();
const port = 3001;


app.use(express.json());


app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/product', productRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
