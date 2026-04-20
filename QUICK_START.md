# 🚀 Quick Start Guide - Food Delivery App

## IMPORTANT: Complete Setup Steps

### Step 1: Install Dependencies

**For Backend:**
```bash
cd C:\Users\ASUS\OneDrive\Documents\FOOD\server
npm install
```

**For Frontend:**
```bash
cd C:\Users\ASUS\OneDrive\Documents\FOOD\client
npm install
```

### Step 2: Setup MongoDB

Make sure MongoDB is running on your system:
- **Local MongoDB:** `mongod` (runs on localhost:27017)
- **Or use MongoDB Atlas:** Update `.env` with your connection string

### Step 3: Configure Environment Variables

**Server - Create `.env` file in `server` folder:**
```
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=food_delivery_super_secret_key_2024
PORT=5000
NODE_ENV=development
```

**Client - Create `.env` file in `client` folder:**
```
REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Start the Application

**Terminal 1 - Start Backend Server:**
```bash
cd C:\Users\ASUS\OneDrive\Documents\FOOD\server
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd C:\Users\ASUS\OneDrive\Documents\FOOD\client
npm start
```

You should see:
```
Compiled successfully!
```

### Step 5: Test the Application

Open your browser: `http://localhost:3000`

**Test Signup:**
1. Click "Sign Up"
2. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123
   - Confirm Password: Test@123
3. Click "Create Account"

**Test Login (development):**

A default user is seeded automatically when the server starts (dev mode):

```
Email: test@foodhub.com
Password: password123
```

Use these credentials or sign up normally.

**Test Login:**
1. Click "Login"
2. Enter:
   - Email: test@example.com
   - Password: Test@123
3. Click "Login"

---

## If You Get Errors:

### Error: "Cannot find module 'express'"
**Solution:** 
```bash
cd server
npm install
```

### Error: "connection refused" (MongoDB)
**Solution:** Make sure MongoDB is running:
```bash
# Check if MongoDB is installed
mongod --version

# Start MongoDB
mongod
```

### Error: "Module not found: API_URL"
**Solution:** Make sure `.env` file exists in client folder with:
```
REACT_APP_API_URL=http://localhost:5000
```

### Error: "Login not working"
**Solution:**
1. Check that server is running (Terminal 1 shows "🚀 Server running")
2. Check that MongoDB is running
3. Check browser console (F12) for errors
4. Make sure you created an account first before logging in

---

## API Endpoints for Testing (Using Postman)

### Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@123",
  "confirmPassword": "Test@123"
}
```

### Login User
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "Test@123"
}
```

### Get All Foods
```
GET http://localhost:5000/api/foods
```

### Get User Profile
```
GET http://localhost:5000/api/auth/profile
Header:
Authorization: Bearer <your_token_from_login>
```

---

## Troubleshooting Checklist

- [ ] Node.js and npm installed? (`node -v` and `npm -v`)
- [ ] MongoDB running? (Check port 27017)
- [ ] Both `.env` files created?
- [ ] Server showing "🚀 Server running"?
- [ ] Client showing "Compiled successfully"?
- [ ] Frontend at http://localhost:3000?
- [ ] Backend API at http://localhost:5000?
- [ ] No browser console errors (F12)?

---

## Quick Run Scripts

Two batch files have been created for easy startup:

**`start-server.bat`** - Double click to start server
**`start-client.bat`** - Double click to start client (in separate window)

---

## Need More Help?

Check the following files:
- API Documentation: `API_DOCS.md`
- Setup Guide: `SETUP_GUIDE.md`
- Project Summary: `PROJECT_SUMMARY.md`

