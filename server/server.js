import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import schemesRouter from './routes/schemes.js';
import chatRouter from './routes/chat.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB error:', err));

app.use('/api/schemes', schemesRouter);
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'SchemeSaathi API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});