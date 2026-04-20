# 🔍 Route Not Found - Debugging Guide

## What's Happening?

When you get "Route not found" error, it means the server received a request but couldn't match it to any route.

---

## ✅ How to Debug

### Step 1: Check Server Console

Restart the server and look for this output:

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
```

### Step 2: Check Request URL

When you make a request, you should see in the server console:

```
📍 POST /api/auth/register
```

If you see a ❌ instead:

```
❌ Route not found: POST /api/invalid-route
```

Then the URL in your frontend code is wrong.

---

## 🔧 Common Issues & Solutions

### Issue 1: Wrong API URL in Frontend

**Problem:** Frontend .env file might point to the wrong base URL and the request
path doesn’t end up at `/api/auth/...` on the server. In development you may also be
using the CRA proxy which forwards whatever path you send.

**Check:**
Open `client/.env` (or your environment variables) and look at
`REACT_APP_API_URL`. It can be either an absolute address or a relative one,
*but the code now automatically appends `/api` if it’s missing*:

```js
// client/src/services/api.jsx
let API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
if (!API_URL.endsWith('/api')) {
  API_URL = API_URL.replace(/\/*$/, '');
  API_URL += '/api';
}
```

That means the following are both acceptable:

```
REACT_APP_API_URL=http://localhost:5000      # env var without /api
REACT_APP_API_URL=http://localhost:5000/api  # env var with /api
```

(If you leave the variable unset the default will be
`http://localhost:5000/api`.)

The key thing is that the *final request path* the browser sends must include
`/api` at the front. If you ever see `❌ Route not found: POST /auth/register`
in the server log, it’s because the client omitted `/api` somewhere.

---

### Issue 2: Typo in API Service Calls

**Check:** `client/src/services/authService.jsx`

Should be:
```jsx
api.post('/auth/register', userData)   // ✅ Correct
api.post('/auth/login', credentials)   // ✅ Correct
```

NOT:
```jsx
api.post('/authRegister', userData)    // ❌ Wrong
api.post('/auth/sign-up', userData)    // ❌ Wrong
```

---

### Issue 3: Server Routes Not Loaded

**Check:** Server console should show all routes loading

If you see errors like:
```
Error: Cannot find module './routes/authRoutes.jsx'
```

**Solution:** Make sure all route files exist:
- `/server/routes/authRoutes.jsx` ✅
- `/server/routes/foodRoutes.jsx` ✅
- `/server/routes/categoryRoutes.jsx` ✅
- `/server/routes/orderRoutes.jsx` ✅

---

### Issue 4: Middleware Not Properly Imported

**Check:** All route files should import middleware properly

```jsx
const authenticate = require('../middleware/authenticate.jsx');  // ✅ .jsx included
const authorize = require('../middleware/authorize.jsx');         // ✅ .jsx included
```

---

## 📋 Route Reference Table

| Method | URL | Purpose | Auth Required |
|--------|-----|---------|----------------|
| POST | `/api/auth/register` | Create account | ❌ No |
| POST | `/api/auth/login` | Login user | ❌ No |
| GET | `/api/auth/profile` | Get user profile | ✅ Yes |
| PUT | `/api/auth/profile` | Update profile | ✅ Yes |
| GET | `/api/foods` | Get all foods | ❌ No |
| GET | `/api/foods/:id` | Get single food | ❌ No |
| POST | `/api/foods` | Create food (admin) | ✅ Yes |
| GET | `/api/categories` | Get categories | ❌ No |
| POST | `/api/categories` | Create category (admin) | ✅ Yes |
| POST | `/api/orders` | Create order | ✅ Yes |
| GET | `/api/orders/my-orders` | Get user orders | ✅ Yes |
| GET | `/api/orders/:id` | Get order details | ✅ Yes |

---

## 🧪 Test Each Route

### Using Browser Console

Open browser console (F12) and run:

```javascript
// Test Register
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'Test@123',
    confirmPassword: 'Test@123'
  })
})
.then(r => r.json())
.then(d => console.log(d))
.catch(e => console.error(e))
```

### Using Postman

1. Open Postman
2. Create new request:
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body (JSON):
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "Test@123",
       "confirmPassword": "Test@123"
     }
     ```
3. Click "Send"
4. Check response

---

## 🔍 Server Logs to Look For

### ✅ Good Logs (Routes Working)

```
🚀 Server running on http://localhost:5000
MongoDB Connected: localhost
✅ Available routes:
   POST /api/auth/register
   ...
📍 POST /api/auth/register
```

### ❌ Bad Logs (Routes Missing)

```
Cannot find module './routes/authRoutes.jsx'
❌ Route not found: POST /api/auth/register
```

---

## 📝 Checklist

- [ ] Server running on port 5000
- [ ] MongoDB connected
- [ ] All route files exist with `.jsx` extension
- [ ] `.env` files created correctly
- [ ] Frontend `.env` has correct `REACT_APP_API_URL`
- [ ] Server shows "✅ Available routes" message
- [ ] Browser Network tab shows correct API URLs
- [ ] No "Cannot find module" errors in server console

---

## 🚀 Next Steps

1. Check server console for all the debug info above
2. Verify all route files exist
3. Check .env files are correct
4. Restart both server and client
5. Try signup again

