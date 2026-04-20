// This script connects to the database, reads all categories, and ensures at least one
// food item exists for each category. It's useful for development/testing.
//
// Usage: from project root run `node server/scripts/seedFoods.js`
// Make sure your server's .env is configured (MONGODB_URI, JWT_SECRET not required).

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category.js');
const Food = require('../models/Food.js');

dotenv.config();

async function connect() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodhub';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('🗄 Connected to', uri);
}

async function seedFoods() {
  try {
    await connect();

    const categories = await Category.find();
    if (categories.length === 0) {
      console.log('⚠️ No categories found. Create some categories first.');
      process.exit(0);
    }

    for (const cat of categories) {
      const exists = await Food.findOne({ category: cat._id });
      if (exists) {
        console.log(`✅ Category "${cat.name}" already has food: ${exists.name}`);
        continue;
      }

      const sample = new Food({
        name: `Sample ${cat.name}`,
        description: `Delicious ${cat.name} item`,
        price: 9.99,
        category: cat._id,
        image: '',
        createdBy: mongoose.Types.ObjectId(), // dummy user id; this field is required
      });
      await sample.save();
      console.log(`🆕 Created food "${sample.name}" for category "${cat.name}"`);
    }

    console.log('🎯 Seeding complete');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedFoods();
