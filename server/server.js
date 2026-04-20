const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database.js');
const errorHandler = require('./middleware/errorHandler.js');

dotenv.config();

const app = express();

connectDB().then(async () => {
  // create a quick test account when database is empty (development only)
  if (process.env.NODE_ENV !== 'production') {
    try {
      const User = require('./models/User.js');

      // create a plain user account if none exists
      const existing = await User.findOne({ email: 'test@foodhub.com' });
      if (!existing) {
        const testUser = new User({
          name: 'Test User',
          email: 'test@foodhub.com',
          password: 'password123',
          role: 'user',
        });
        await testUser.save();
        console.log('🛠 Created default login: test@foodhub.com / password123 (user)');
      }

      // create a default admin account when no admin present
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        const adminUser = new User({
          name: 'Admin User',
          email: 'admin@foodhub.com',
          password: 'admin123',
          role: 'admin',
        });
        await adminUser.save();
        console.log('🔑 Created default admin: admin@foodhub.com / admin123');
      }
    } catch (err) {
      console.error('Error seeding default user', err);
    }
  }
}).catch((err) => {
  console.error('Database connection failed', err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Debug middleware
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/categories', require('./routes/categoryRoutes.js'));
app.use('/api/foods', require('./routes/foodRoutes.js'));
app.use('/api/orders', require('./routes/orderRoutes.js'));
app.use('/api/reviews', require('./routes/reviewRoutes.js'));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`❌ Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Available routes:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/auth/profile`);
  console.log(`   PUT  /api/auth/profile`);
  console.log(`   GET  /api/foods`);
  console.log(`   GET  /api/categories`);
  console.log(`   GET  /api/orders`);
  console.log(`   POST /api/orders`);
});
