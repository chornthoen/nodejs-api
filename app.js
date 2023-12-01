const express = require('express');
const mainRoutes = require('./src/routes/brandRoutes');


const app = express();
const port = 3001;

app.use(express.json());

app.use('/api/v1/brands', mainRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
