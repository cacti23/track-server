require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middleware/requireAuth');

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:admin@cluster0.ph7gm4b.mongodb.net/';

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo instance 🚀');
});

mongoose.connection.on('error', (error) => {
  console.log('Error connecting to Mongo 💀:\n', error);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
