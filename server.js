const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const {swaggerUi, swaggerSpec} = require('./swagger');

const PORT = 4000;

const app = express();


mongoose.connect('mongodb://localhost/metaphoto', {connectTimeoutMS: 30000})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
const fs = require('fs')
;
const jwt = require("jsonwebtoken");
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())

app.use(cors());

app.use('/users', require('./routes/users'));
app.use('/images', require('./routes/images'));
app.use('/boards', require('./routes/boards'));
app.use('/login', require('./routes/login'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API is available at: http://localhost:${PORT}`);
});
