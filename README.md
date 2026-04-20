<<<<<<< HEAD
# 🍔 MERN Stack Food Delivery Website

A production-ready Food Delivery Web Application built with MongoDB, Express.js, React.js, and Node.js.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

---

## ✨ Features

### 👤 User Features
- User Registration & Login with JWT authentication

> **Note:** in development the server will automatically create a test account (`test@foodhub.com` / `password123`) so you can log in without signing up.

- Sample data seeding script to populate the database with at least one food per category.

### Data seeding (development)

To quickly add example food items for every existing category run:

```bash
node server/scripts/seedFoods.js
```

The script will connect to the database, iterate over all categories,
create a `Sample <Category>` food item when the category has none, and
then exit. It requires `MONGODB_URI` in your `.env` but does not need the
server to be running.


- Browse food items with categories
- Search & filter functionality
- Add to cart system
- Place orders with order history
- User profile management
- Responsive mobile design

### 🛠 Admin Features
- Admin dashboard with statistics
- Add, edit, and delete food items
- Manage food categories
- View all orders
- Update order status (Pending, Preparing, Delivered)
- Manage user accounts

### 🔒 Advanced Features
- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- File upload for food images
- Toast notifications
- Loading spinners
- Dark mode support

---

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload

---

## 🚀 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (use `.env.example` as reference)

4. Start the server:
```bash
npm start
```

Server runs on http://localhost:5000

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (use `.env.example` as reference)

4. Start the React app:
```bash
npm start
```

App runs on http://localhost:3000

---

## 📁 Project Structure

```
food-delivery-app/
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Food.js
│   │   ├── Order.js
│   │   └── Category.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── foodController.js
│   │   ├── orderController.js
│   │   └── categoryController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── foodRoutes.js
│   │   ├── orderRoutes.js
│   │   └── categoryRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminAuth.js
│   ├── config/
│   │   └── database.js
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── Cart.js
│   │   │   ├── FoodCard.js
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── FoodListing.js
│   │   │   ├── ProductDetails.js
│   │   │   ├── Checkout.js
│   │   │   ├── UserDashboard.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── foodService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── README.md
└── SETUP_GUIDE.md
```

---

## 🔐 Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 📚 API Documentation

See [API_DOCS.md](./API_DOCS.md) for complete API documentation with Postman collection.

---

## 🌐 Deployment

### Deploy Backend (Render)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

### Deploy Frontend (Netlify)
1. Build: `npm run build`
2. Connect GitHub to Netlify
3. Set `REACT_APP_API_URL` to production backend URL
4. Deploy

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Created as a professional MERN Stack project for college coursework and production use.

---

## 📧 Support

For issues or questions, please create an issue in the repository.
=======
# food-delivery-mern-app
A full-stack MERN Food Delivery application with user panel, admin dashboard, cart system, and order management.
>>>>>>> 9d3d6a1c833c1e2c5b4542e14fc033670bab22e0
