import dotenv  from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import cors from 'cors';

dotenv.config()

import offerRoutes from './routes/offers.js';
import articleRoutes from './routes/articles.js'

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(express.static('./public'));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({
      appName: process.env.npm_package_name,
      appVersion: process.env.npm_package_version
    });
});
app.use('/offers', offerRoutes);
app.use('/articles', articleRoutes);

// MongoDB Atlas
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qlefp.mongodb.net/test`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

