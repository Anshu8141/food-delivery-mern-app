# 📖 API Documentation - FoodHub

Complete API reference with examples for all endpoints.

---

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

All protected endpoints require a JWT token in the header:

```
Authorization: Bearer <your_token>
```

---

## 🔐 Authentication Endpoints

### Register User

**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Login User

**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Get Profile

**GET** `/auth/profile`

Headers: Authorization required

Response:
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "role": "user"
  }
}
```

---

### Update Profile

**PUT** `/auth/profile`

Headers: Authorization required

Request:
```json
{
  "name": "John Updated",
  "phone": "+9876543210",
  "address": "456 New St"
}
```

Response:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## 🍔 Food Endpoints

### Get All Foods

**GET** `/foods?category=categoryId&search=name&sortBy=createdAt`

Query Parameters:
- `category` (optional) - Filter by category ID
- `search` (optional) - Search by food name
- `sortBy` (optional) - Sort by: `createdAt`, `price`, `rating`

Response:
```json
{
  "success": true,
  "count": 10,
  "foods": [
    {
      "_id": "food_id",
      "name": "Margherita Pizza",
      "description": "Classic pizza",
      "price": 399,
      "category": "category_id",
      "image": "image_url",
      "rating": 4.5,
      "availability": true,
      "preparationTime": 30,
      "ingredients": ["flour", "cheese"]
    }
  ]
}
```

---

### Get Food by ID

**GET** `/foods/:id`

Response:
```json
{
  "success": true,
  "food": { ... }
}
```

---

### Create Food (Admin)

**POST** `/foods`

Headers: Authorization required (Admin)

Request (FormData):
- `name` - Food name
- `description` - Description
- `price` - Price in ₹
- `category` - Category ID
- `preparationTime` - Minutes
- `ingredients` - Comma-separated list
- `image` - Image file

---

## 🏷️ Category Endpoints

### Get All Categories

**GET** `/categories`

Response:
```json
{
  "success": true,
  "count": 5,
  "categories": [
    {
      "_id": "cat_id",
      "name": "Pizza",
      "description": "Delicious pizzas",
      "image": "image_url"
    }
  ]
}
```

---

### Create Category (Admin)

**POST** `/categories`

Headers: Authorization required (Admin)

Request (FormData):
- `name` - Category name
- `description` - Description
- `image` - Image file

---

## 🛒 Order Endpoints

### Create Order

**POST** `/orders`

Headers: Authorization required

Request:
```json
{
  "items": [
    {
      "foodId": "food_id",
      "quantity": 2
    }
  ],
  "deliveryAddress": "123 Main St, City",
  "phoneNumber": "+1234567890",
  "paymentMethod": "cash_on_delivery",
  "notes": "No onions"
}
```

Response:
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "order_id",
    "user": "user_id",
    "items": [...],
    "totalAmount": 798,
    "status": "pending",
    "deliveryAddress": "123 Main St, City",
    "estimatedDeliveryTime": "2026-02-17T01:00:00Z"
  }
}
```

---

### Get My Orders

**GET** `/orders/my-orders`

Headers: Authorization required

Response:
```json
{
  "success": true,
  "count": 3,
  "orders": [...]
}
```

---

### Get Order by ID

**GET** `/orders/:id`

Headers: Authorization required

---

### Update Order Status (Admin)

**PUT** `/orders/:id/status`

Headers: Authorization required (Admin)

Request:
```json
{
  "status": "preparing"
}
```

Valid statuses:
- `pending`
- `confirmed`
- `preparing`
- `out_for_delivery`
- `delivered`
- `cancelled`

---

### Cancel Order

**PUT** `/orders/:id/cancel`

Headers: Authorization required

---

### Get Order Statistics (Admin)

**GET** `/orders/stats/dashboard`

Headers: Authorization required (Admin)

Response:
```json
{
  "success": true,
  "stats": {
    "totalOrders": 150,
    "totalRevenue": 59850,
    "pendingOrders": 12,
    "deliveredOrders": 130
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 📊 Postman Collection

Save as `FoodHub.postman_collection.json`:

```json
{
  "info": {
    "name": "FoodHub API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/register"
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/auth/login"
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding in production.

---

## Pagination

Implement pagination by adding to requests:

```
?page=1&limit=10
```

---

## Version

Current API Version: **v1.0.0**

---

**Last Updated**: February 17, 2026
