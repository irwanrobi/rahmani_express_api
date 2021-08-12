const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles');
const userRoutes = require('./routes/users');
const offerRoutes = require('./routes/offers');
const articleRoutes = require('./routes/articles');

const APP_CONFIG = require('./config')

const app = express();

const corsOptions = {
  origin: APP_CONFIG.APP.CONSUMER_URL
};

app.use(express.static('./public'));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({
      appName: APP_CONFIG.APP.NAME,
      appVersion: APP_CONFIG.APP.VERSION,
      message: "Welcome to Rahmani application."
    });
});
app.get('/check', (req, res) => {
  res.send('App is Running on ' + APP_CONFIG.APP.BASE_URL);
});
app.use('/auth', authRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/offers', offerRoutes);
app.use('/articles', articleRoutes);

// MongoDB Atlas
const CONNECTION_URL = APP_CONFIG.DB.HOST;
const PORT = APP_CONFIG.APP.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

