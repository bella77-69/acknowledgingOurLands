require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const acknowledgmentRoutes = require('./routes/acknowledgments');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  'https://acknowledging-our-lands.vercel.app', 
  'https://acknowledgingourlands-server.onrender.com'
];

app.use(cors({
    origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/acknowledgments', acknowledgmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));