import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import {swaggerSpec, swaggerUi} from './swagger.js';

import usersRoutes from './routes/users.js';
import imagesRoutes from './routes/images.js';
import boardsRoutes from './routes/boards.js';
import loginRoutes from './routes/login.js';

dotenv.config();

const PORT = 4000;

const app = express();

mongoose.connect('mongodb://localhost/metaphoto', {connectTimeoutMS: 30000})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const uploadsDir = path.join(path.resolve(), 'uploads'); // Updated __dirname usage
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);
app.use('/images', imagesRoutes);
app.use('/boards', boardsRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API is available at: http://localhost:${PORT}`);
});
