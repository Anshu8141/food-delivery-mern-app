# 🎯 Quick Reference Card

## 🚀 Start App in 3 Steps

### Step 1: Start Server
```bash
cd C:\Users\ASUS\OneDrive\Documents\FOOD\server
npm start
```
**Wait for:** `🚀 Server running on http://localhost:5000`

### Step 2: Start Client  
```bash
cd C:\Users\ASUS\OneDrive\Documents\FOOD\client
npm start
```
**Wait for:** `Compiled successfully`

### Step 3: Open Browser
```
http://localhost:3001
```

---

## ✅ Verify Everything Works

### Check 1: Server Console
```
✅ Available routes:
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/foods
   (etc...)
```

### Check 2: Frontend Loads
Frontend should show navbar with "Sign Up" button

### Check 3: Create Account
- Click "Sign Up"
- Fill form and submit
- Should see success message

---

## 🧪 Test Signup

**Email:** anything@example.com  
**Password:** anything123  
**Confirm:** anything123  

Click "Create Account" → Should work! ✅

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| Port already in use | `taskkill /F /IM node.exe` |
| Route not found | Check `client/.env` has right URL |
| MongoDB error | Make sure MongoDB is running |
| Can't login | Use email from signup |

---

## 📊 Environment Files

### `server/.env`
```
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=food_delivery_super_secret_key_2024
PORT=5000
NODE_ENV=development
```

### `client/.env`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🎮 Available Features

✅ Sign Up / Login  
✅ Browse Foods  
✅ Search Foods  
✅ Filter by Category  
✅ Add to Cart  
✅ Checkout  
✅ Place Order  
✅ View Order History  
✅ User Dashboard  
✅ Admin Panel  

---

## 📱 API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/auth/register | ❌ |
| POST | /api/auth/login | ❌ |
| GET | /api/foods | ❌ |
| POST | /api/orders | ✅ |
| GET | /api/auth/profile | ✅ |

---

## 💡 Pro Tips

1. **Multiple Accounts:** Use different emails for each test
2. **Debug:** Check browser Network tab (F12) for API calls
3. **Logs:** Watch server console for request logs `📍`
4. **Clear Cache:** `npm cache clean --force`
5. **Fresh Install:** Delete node_modules and run `npm install`

---

## 🆘 Emergency Commands

```bash
# Kill everything
taskkill /F /IM node.exe

# Fresh start
npm cache clean --force
npm install

# Check what's running on 5000
netstat -ano | findstr :5000

# Remove node_modules
rmdir /s /q node_modules
del package-lock.json
```

---

## 📞 Quick Help

**Q: "Route not found"**  
A: Check `client/.env` → `REACT_APP_API_URL=http://localhost:5000`

**Q: Can't create account**  
A: Check server console shows `📍 POST /api/auth/register`

**Q: Frontend won't load**  
A: Check client terminal for errors

**Q: Port 5000 in use**  
A: Run `taskkill /F /IM node.exe`

---

## ✨ What's Working

✅ All files converted to `.jsx`  
✅ All routes registered  
✅ MongoDB connected  
✅ Authentication working  
✅ API endpoints functional  
✅ Frontend components ready  

**Everything is ready! Start testing now! 🚀**

