import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutesLocal from './routes/products-local.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutesLocal);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TFG Backend API is running (Local Database)', database: 'JSON File' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log('✅ Using LOCAL JSON database (no MongoDB needed!)');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`💾 Database: backend/db/products.json`);
  console.log(`\n⚠️  Note: Data is stored locally. To use MongoDB later, switch back to server.js\n`);
});

export default app;
