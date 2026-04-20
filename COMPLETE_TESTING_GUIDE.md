# ✅ Complete Testing Guide

## 🎉 Your App is Running!

### Current Status:
```
✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:3001 (or next available port)
✅ MongoDB: Connected locally
```

---

## 📍 Verify Routes are Working

### In Server Console

You should see:
```
🚀 Server running on http://localhost:5000
✅ Available routes:
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/auth/profile
   PUT  /api/auth/profile
   GET  /api/foods
   GET  /api/categories
   GET  /api/orders
   POST /api/orders
MongoDB Connected: localhost
```

### Debug Requests

Every time you make a request, server console shows:
```
📍 POST /api/auth/register
📍 GET /api/foods
```

If you see ❌ Route not found, the URL is wrong.

---

## 🧪 Test Signup Now

### Step 1: Open Browser
Go to your frontend URL (check client terminal for exact port)
```
http://localhost:3001
```

### Step 2: Create Account

Click **"Sign Up"** and enter:
```
Full Name: John Doe
Email: john@example.com
Password: John@123456
Confirm Password: John@123456
```

### Step 3: Watch Server Console

You should see:
```
📍 POST /api/auth/register
```

✅ If account created → Success!  
❌ If "Route not found" → URL problem (see debugging guide)

---

## 🔍 If You Get "Route Not Found"

### Check 1: .env Files

**Server** (`server/.env`):
```
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=food_delivery_super_secret_key_2024
PORT=5000
NODE_ENV=development
```

**Client** (`client/.env`):
```
REACT_APP_API_URL=http://localhost:5000
```

### Check 2: Browser Network Tab

Open Browser DevTools (F12) → Network tab

When you try to signup, look for a request like:
```
POST http://localhost:5000/api/auth/register
```

If you see:
- ❌ `http://localhost:3001/api/auth/register` → Wrong port in frontend
- ❌ `http://localhost:5000/auth/register` → Missing `/api` (fix .env)
- ❌ `http://localhost:5000/api/authRegister` → Typo in service file

### Check 3: Server Console

Restart server and check:
```
✅ Available routes:
   POST /api/auth/register
```

If you don't see this, there's an issue with route imports.

---

## 🧪 Complete Test Flow

### Test 1: Register
```
POST http://localhost:5000/api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@123",
  "confirmPassword": "Test@123"
}
```
✅ Should get token and user data

### Test 2: Login
```
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "Test@123"
}
```
✅ Should get token

### Test 3: Get Foods
```
GET http://localhost:5000/api/foods
```
✅ Should get array of foods

### Test 4: Get Profile (with token)
```
GET http://localhost:5000/api/auth/profile
Header: Authorization: Bearer YOUR_TOKEN
```
✅ Should get user profile

---

## 📱 Using Postman to Test

1. Download Postman: https://www.postman.com/downloads/
2. Create new request:
   - Method: POST
   - URL: http://localhost:5000/api/auth/register
   - Body (JSON):
     ```json
     {
       "name": "Postman User",
       "email": "postman@example.com",
       "password": "Test@123",
       "confirmPassword": "Test@123"
     }
     ```
   - Click Send

---

## 📊 Common Error Responses

### 400 - Bad Request
```json
{
  "message": "All fields are required"
}
```
**Solution:** Make sure all fields are filled

### 400 - Passwords Don't Match
```json
{
  "message": "Passwords do not match"
}
```
**Solution:** Confirm password must exactly match password

### 400 - User Exists
```json
{
  "message": "User already exists"
}
```
**Solution:** Use different email address

### 401 - No Token
```json
{
  "message": "No token provided"
}
```
**Solution:** Add Authorization header with token

### 404 - Route Not Found
```json
{
  "message": "Route not found",
  "path": "/api/authRegister"
}
```
**Solution:** Check URL - typo or wrong path

---

## ✨ Features to Test

After signup works:

1. **Browse Foods**
   - Homepage loads
   - Food items display

2. **Search**
   - Type in search box
   - Results update

3. **Filter**
   - Select category
   - Foods filter by category

4. **Add to Cart**
   - Click "Add to Cart"
   - Item appears in cart

5. **Checkout**
   - Enter delivery address
   - Place order

6. **View Orders**
   - See order history
   - Check order status

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Route not found" | Check .env REACT_APP_API_URL |
| "Cannot find module" | Restart server (routes weren't loaded) |
| Port already in use | Kill node: `taskkill /F /IM node.exe` |
| MongoDB connection error | Start MongoDB service |
| Frontend won't load | Check client terminal for errors |
| Signup button doesn't work | Check browser console (F12) |

---

## 📞 Quick Help

**Check Server Logs:**
```
Look for: 📍 POST /api/auth/register
Or: ❌ Route not found: POST /api/...
```

**Check Frontend Logs:**
```
F12 → Console → Look for error messages
F12 → Network → Check API request URLs
```

---

## ✅ Success Checklist

- [ ] Server shows "✅ Available routes"
- [ ] MongoDB shows "Connected: localhost"
- [ ] Frontend loads without errors
- [ ] Signup form visible
- [ ] Server console shows "📍 POST /api/auth/register"
- [ ] Signup successful (see success message)
- [ ] Can login with created account
- [ ] Can see foods on homepage

---

**All set! Test everything now! 🚀**

