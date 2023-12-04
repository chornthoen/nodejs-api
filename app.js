const express = require('express');
const brandRoutes = require('./src/routes/brandRoutes');
const userRoutes = require('./src/routes/userRoutes')


const app = express();
const port = 3001;


app.use(express.json());

app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/users', userRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
