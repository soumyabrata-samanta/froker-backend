const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config()
const app = express();

app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))  //connecting mongodb 
.catch(err => console.log(err));
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
