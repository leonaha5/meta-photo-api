const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imagesRouter = require('./routes/images');

const app = express();
const PORT = 5000;


mongoose.connect('mongodb://localhost/metaphoto')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


app.use(express.json())

app.use('/api', imagesRouter);

app.listen(PORT, () => console.log('Server Started'))