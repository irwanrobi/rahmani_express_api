const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');

dotenv.config()

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles');
const userRoutes = require('./routes/users');
const offerRoutes = require('./routes/offers');
const articleRoutes = require('./routes/articles');

const app = express();

var corsOptions = {
  origin: [ process.env.APP_CONSUMER_URL, process.env.APP_CONSUMER_URL2 ]
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
app.get('/check', (req, res) => {
  res.send('App is Running on ' + process.env.BASE_URL);
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

