'use strict';

const express = require('express');
const cors = require('cors');
const db = require('./app/models/index');

const app = express();

var corsOptions = {
    origin: 'http://localhost:4000'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
    .then(() => {
        console.log('Drop and Resync Db');
    })
    .catch(err => {
        console.log("Failed to sync database", err.message);
    });

app.get('/', (req, res) => {
    res.json({ message: 'Fixtures Management System' });
});

require('./app/config/routes')(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});