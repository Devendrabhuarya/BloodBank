require('dotenv').config();
const express = require('express');
const dbConfig = require('./config/dbConfig');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json());


const userRoutes = require('./routes/userRoute');
const inventoryRoute = require('./routes/inventoryRoute');
const dashBoardRoute = require('./routes/dashBoardRoute');
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoute);
app.use('/api/dashboard', dashBoardRoute);


// deployment config

const path = require('path');
__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`running in port ${port}`));