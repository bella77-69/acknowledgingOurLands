require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const acknowledgmentRoutes = require('./routes/acknowledgments');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/acknowledgments', acknowledgmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));