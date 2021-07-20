import dotenv  from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import cors from 'cors';

dotenv.config()

import authRoutes from './routes/auth.js'
import roleRoutes from './routes/roles.js'
import userRoutes from './routes/users.js'
import offerRoutes from './routes/offers.js';
import articleRoutes from './routes/articles.js'

const app = express();

var corsOptions = {
  origin: process.env.APP_CONSUMER_URL
};

app.use(express.static('./public'));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({
      appName: process.env.npm_package_name,
      appVersion: process.env.npm_package_version,
      message: "Welcome to Rahmani application."
    });
});
app.use('/auth', authRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/offers', offerRoutes);
app.use('/articles', articleRoutes);

// MongoDB Atlas
const CONNECTION_URL = process.env.DB_CONNECT;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

