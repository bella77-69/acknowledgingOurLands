import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/usersRoutes.js';
import acknowledgmentRoutes from './routes/acknowledgmentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api/acknowledgments', acknowledgmentRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});