# 📚 Setup Guide - FoodHub MERN Stack

Complete step-by-step guide to setup and run the Food Delivery Application.

---

## 🔧 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas Account) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** - Comes with Node.js

---

## 📋 Project Structure

```
food-delivery-app/
│
├── server/                    # Node.js + Express Backend
│   ├── models/               # MongoDB Schemas
│   ├── controllers/          # Business Logic
│   ├── routes/               # API Routes
│   ├── middleware/           # Authentication & Error Handling
│   ├── config/               # Database Configuration
│   ├── uploads/              # File Uploads
│   ├── server.jsx            # Main Server File
│   ├── package.json
│   └── .env.example
│
└── client/                    # React.js Frontend
    ├── public/               # Static Files
    ├── src/
    │   ├── components/       # React Components
    │   ├── pages/            # Page Components
    │   ├── context/          # Context API (Auth, Cart)
    │   ├── services/         # API Services
    │   ├── styles/           # CSS Stylesheets
    │   ├── App.jsx           # Main App Component
    │   └── index.jsx         # Entry Point
    ├── package.json
    └── .env.example
```

---

## 🚀 Backend Setup

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
NODE_ENV=development
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

**MongoDB Setup:**
- **Local**: Install MongoDB and ensure it's running on `localhost:27017`
- **Atlas**: Create a free cluster at https://www.mongodb.com/cloud/atlas and get your connection string

### Step 4: Start the Server

```bash
npm start
```

Or with auto-reload (install nodemon first):

```bash
npm install -g nodemon
npm run dev
```

Server will run on: **http://localhost:5000**

---

## 💻 Frontend Setup

### Step 1: Navigate to Client Directory

```bash
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment Variables

Create a `.env` file in the `client` directory:

```bash
cp .env.example .env
```

Edit `.env`:

```
REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Start the React App

```bash
npm start
```

App will run on: **http://localhost:3000**

---

## 📋 Database Collections

### Users Collection

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "address": "123 Main St",
  "role": "user",
  "profileImage": null,
  "isActive": true,
  "createdAt": "2026-02-17T00:00:00.000Z",
  "updatedAt": "2026-02-17T00:00:00.000Z"
}
```

### Categories Collection

```json
{
  "_id": "ObjectId",
  "name": "Pizza",
  "image": "url_to_image",
  "description": "Delicious pizzas",
  "createdAt": "2026-02-17T00:00:00.000Z"
}
```

### Food Items Collection

```json
{
  "_id": "ObjectId",
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and cheese",
  "price": 399,
  "category": "ObjectId",
  "image": "url_to_image",
  "rating": 4.5,
  "availability": true,
  "preparationTime": 30,
  "ingredients": ["flour", "cheese", "tomato"],
  "createdBy": "ObjectId",
  "createdAt": "2026-02-17T00:00:00.000Z"
}
```

### Orders Collection

```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "items": [
    {
      "food": "ObjectId",
      "quantity": 2,
      "price": 399
    }
  ],
  "totalAmount": 798,
  "deliveryAddress": "123 Main St, City",
  "phoneNumber": "+1234567890",
  "status": "pending",
  "paymentStatus": "pending",
  "paymentMethod": "cash_on_delivery",
  "estimatedDeliveryTime": "2026-02-17T01:00:00.000Z",
  "notes": "No onions please",
  "createdAt": "2026-02-17T00:00:00.000Z"
}
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | User Registration |
| POST | /api/auth/login | ❌ | User Login |
| GET | /api/auth/profile | ✅ | Get User Profile |
| PUT | /api/auth/profile | ✅ | Update Profile |
| GET | /api/auth/users | ✅ Admin | Get All Users |
| DELETE | /api/auth/users/:id | ✅ Admin | Delete User |

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/categories | ❌ | Get All Categories |
| GET | /api/categories/:id | ❌ | Get Category Details |
| POST | /api/categories | ✅ Admin | Create Category |
| PUT | /api/categories/:id | ✅ Admin | Update Category |
| DELETE | /api/categories/:id | ✅ Admin | Delete Category |

### Foods

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/foods | ❌ | Get All Foods |
| GET | /api/foods/:id | ❌ | Get Food Details |
| GET | /api/foods/category/:categoryId | ❌ | Get Foods by Category |
| POST | /api/foods | ✅ Admin | Create Food |
| PUT | /api/foods/:id | ✅ Admin | Update Food |
| DELETE | /api/foods/:id | ✅ Admin | Delete Food |

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/orders | ✅ | Create Order |
| GET | /api/orders/my-orders | ✅ | Get My Orders |
| GET | /api/orders/:id | ✅ | Get Order Details |
| PUT | /api/orders/:id/cancel | ✅ | Cancel Order |
| GET | /api/orders | ✅ Admin | Get All Orders |
| PUT | /api/orders/:id/status | ✅ Admin | Update Order Status |
| GET | /api/orders/stats/dashboard | ✅ Admin | Get Statistics |

---

## 👤 Test Accounts

### Admin Account

```
Email: admin@example.com
Password: admin123
```

### User Account

```
Email: user@example.com
Password: user123
```

---

## 🎯 Features Checklist

### User Features
- ✅ User Registration & Login
- ✅ Browse Food Items
- ✅ Search & Filter Foods
- ✅ Add to Cart
- ✅ Checkout & Place Orders
- ✅ View Order History
- ✅ Update Profile

### Admin Features
- ✅ Admin Dashboard
- ✅ Add/Edit/Delete Foods
- ✅ Manage Categories
- ✅ View All Orders
- ✅ Update Order Status
- ✅ View Statistics

### Technical Features
- ✅ JWT Authentication
- ✅ Bcrypt Password Hashing
- ✅ MongoDB Integration
- ✅ File Upload Support
- ✅ Error Handling
- ✅ Context API State Management
- ✅ Responsive Design
- ✅ Loading States

---

## 🌐 Deployment Guide

### Deploy Backend (Render)

1. Push your code to GitHub
2. Visit [Render](https://render.com) and sign up
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Set environment variables in Render dashboard
6. Deploy
7. Update `REACT_APP_API_URL` in frontend to your Render URL

### Deploy Frontend (Netlify)

1. Build the project:
```bash
cd client
npm run build
```

2. Visit [Netlify](https://netlify.com) and sign up
3. Drag and drop the `build` folder, or
4. Connect your GitHub repository
5. Set `REACT_APP_API_URL` environment variable
6. Deploy

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your connection string in `.env`
- For Atlas, whitelist your IP

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill process
kill -9 <PID>
```

### CORS Error
- Ensure `cors` is enabled in server.jsx
- Check if API URL is correct in frontend .env

### JWT Token Invalid
- Clear localStorage in browser
- Login again to get new token
- Check JWT_SECRET in .env

---

## 📞 Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com

---

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🚀**
