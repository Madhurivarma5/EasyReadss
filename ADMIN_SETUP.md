# Admin Feature Setup Guide

## Overview

The admin feature allows registered admin users to access a dedicated admin dashboard where they can view Firebase user data (display names, account creation dates, etc.) but **not** emails or passwords (passwords are securely hashed and cannot be retrieved).

## Setting Up Admin Users

### Method 1: Environment Variable (Recommended)

Add admin email addresses to your frontend `.env` file:

```env
VITE_ADMIN_EMAILS=admin@easyreads.com,admin2@example.com,another@admin.com
```

**Note:** Separate multiple emails with commas.

### Method 2: Default Admin Emails

If no environment variable is set, the default admin emails are:
- `admin@easyreads.com`
- `admin@example.com`

You can change these defaults in `frontend/src/utils/admin.js`.

## Backend Admin Setup

For the admin API endpoints to work fully, add admin emails to your backend `.env`:

```env
ADMIN_EMAILS=admin@easyreads.com,admin2@example.com
```

## How It Works

1. **Admin Detection**: When a user logs in, the system checks if their email matches any admin email.

2. **Admin Access**: 
   - Admin users see an "Admin" link in the navbar (highlighted in yellow)
   - Clicking it takes them to `/admin` page
   - Non-admin users are redirected to `/home` if they try to access `/admin`

3. **User Data Display**:
   - **Shown**: User ID, Display Name, Email Verified status, Provider, Account Created date, Last Sign In date
   - **Hidden**: Email addresses (as per requirements)
   - **Cannot Show**: Passwords (securely hashed by Firebase)

## Creating an Admin User

1. Sign up a new user with an email that matches one of your admin emails
2. Log in with that email
3. You'll see the "Admin" link in the navbar
4. Click it to access the admin dashboard

## Backend API Endpoints

### Get All Users
```
GET /api/admin/users
Headers: Authorization: Bearer <firebase-id-token>
```

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "uid": "user-id",
      "displayName": "John Doe",
      "emailVerified": true,
      "metadata": {
        "creationTime": "2024-01-01T00:00:00Z",
        "lastSignInTime": "2024-01-15T00:00:00Z"
      },
      "providerData": [{
        "providerId": "password"
      }]
    }
  ],
  "total": 1
}
```

### Get Specific User
```
GET /api/admin/user/:uid
Headers: Authorization: Bearer <firebase-id-token>
```

## Security Notes

- ✅ Admin emails are checked on both frontend and backend
- ✅ Passwords are never exposed (Firebase hashes them)
- ✅ Email addresses are hidden from admin view
- ✅ Only authenticated admin users can access admin routes
- ⚠️ Make sure to keep your admin email list secure

## Troubleshooting

**Admin link not showing:**
- Check that your email is in `VITE_ADMIN_EMAILS` in frontend `.env`
- Restart the frontend dev server after changing `.env`
- Verify you're logged in with the correct email

**Admin page shows "Backend API not available":**
- Make sure backend server is running
- Check that Firebase Admin SDK is initialized in backend
- Verify `ADMIN_EMAILS` is set in backend `.env`
- Check browser console for API errors

**Cannot see all users:**
- Backend endpoint `/api/admin/users` requires Firebase Admin SDK
- Set up Firebase service account key in backend `.env`:
  ```env
  FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
  ```
- Or the endpoint will return an error

## Example Admin User Flow

1. User signs up with email: `admin@easyreads.com`
2. User logs in
3. Navbar shows "Admin" link (yellow/gold color)
4. User clicks "Admin" → redirected to `/admin`
5. Admin dashboard loads and shows user data (without emails)
6. Admin can refresh to see updated user list

