# 🔧 Troubleshooting Guide

## ❌ Error: MongoDB Connection Failed (ECONNREFUSED)

### Problem:
```
❌ MongoDB connection error: Error: querySrv ECONNREFUSED
```

This means your computer can't reach MongoDB Atlas servers.

---

## 🔍 Possible Causes & Solutions:

### Solution 1: Allow Your IP in MongoDB Atlas ⭐ MOST COMMON

1. Go to MongoDB Atlas: https://cloud.mongodb.com/
2. Login to your account
3. Click on **"Network Access"** in left sidebar
4. Click **"Add IP Address"**
5. Choose one:
   - **"Allow Access from Anywhere"** (0.0.0.0/0) ← Easiest
   - **"Add Current IP Address"** ← More secure
6. Click **"Confirm"**
7. Wait 2 minutes for changes to apply
8. Try `npm start` again

---

### Solution 2: Check Internet Connection

1. Open browser
2. Go to: https://www.google.com
3. If it doesn't load → Fix internet first
4. If it loads → Try Solution 1 or 3

---

### Solution 3: Firewall/VPN Blocking MongoDB

**Windows Firewall:**
1. Search "Windows Security"
2. Click "Firewall & network protection"
3. Click "Allow an app through firewall"
4. Find "Node.js" → Check both Private and Public
5. Click OK
6. Try `npm start` again

**VPN:**
- If using VPN, try disconnecting
- MongoDB Atlas might be blocked by VPN
- Or try a different VPN server

---

### Solution 4: Use Direct Connection String (Alternative)

If DNS resolution fails, try direct IP connection:

1. Open `backend/.env`
2. Replace the MONGODB_URI line with:

```env
MONGODB_URI=mongodb://fqasim970_db_user:YAJpM3m7Na7OPAMz@cluster0-shard-00-00.1stgxqq.mongodb.net:27017,cluster0-shard-00-01.1stgxqq.mongodb.net:27017,cluster0-shard-00-02.1stgxqq.mongodb.net:27017/tfg-furniture?ssl=true&replicaSet=atlas-abc123-shard-0&authSource=admin&retryWrites=true&w=majority
```

3. Save and try `npm start` again

---

### Solution 5: Company/School Network

If you're on a company or school network:
- MongoDB ports (27017) might be blocked
- Ask IT department to whitelist MongoDB Atlas
- Or use personal internet/hotspot

---

### Solution 6: DNS Issues

**Windows:**
```cmd
ipconfig /flushdns
```

**Try Google DNS:**
1. Control Panel → Network and Internet → Network Connections
2. Right-click your network → Properties
3. Select "Internet Protocol Version 4 (TCP/IPv4)"
4. Click Properties
5. Select "Use the following DNS server addresses:"
   - Preferred: 8.8.8.8
   - Alternate: 8.8.4.4
6. Click OK
7. Restart computer
8. Try `npm start` again

---

## ✅ How to Verify It's Fixed:

When you run `npm start`, you should see:
```
✅ Connected to MongoDB
🚀 Server running on port 3000
📍 API available at http://localhost:3000/api
```

---

## 🆘 Still Not Working?

### Quick Alternative: Use Local MongoDB (Temporary)

If you need to test immediately:

1. Install MongoDB locally:
   - Download: https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run -p 27017:27017 mongo`

2. Update `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/tfg-furniture
```

3. Run `npm start`

**Note:** Local MongoDB means data only on your computer (not in cloud)

---

## 📞 Need More Help?

1. **Check MongoDB Status:**
   - Go to: https://status.mongodb.com/
   - See if MongoDB Atlas is down

2. **Test Connection:**
   - Open: https://cloud.mongodb.com/
   - Can you login? If not → Internet/DNS issue

3. **Check Error Details:**
   - Look at the full error in terminal
   - Screenshot and search error code on Google

---

## 🎯 Most Likely Solution:

**99% of the time it's IP whitelisting!**

Go to MongoDB Atlas → Network Access → Add IP (0.0.0.0/0) → Wait 2 min → Try again!

---

## 📝 Prevention:

To avoid this in future:
- Always whitelist 0.0.0.0/0 in MongoDB Atlas
- Use stable internet connection
- Keep MongoDB Atlas account active
- Check "Network Access" if it stops working suddenly

---

**After fixing, delete this file or keep for reference!** 🚀
