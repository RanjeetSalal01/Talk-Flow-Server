# TalkFlow Server - Installation & Setup Guide

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)

## Installation Steps

### 1. Clone/Navigate to the project
```bash
cd c:\Users\VICTUS\Desktop\Projects\TalkFlow\Server
```

### 2. Install Dependencies
```bash
npm install
```

This will install all the required packages (your `package.json` has been updated with socket.io):
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **typegoose** - Type-safe MongoDB models
- **cors** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management
- **typescript** - JavaScript with types
- **ts-node** - TypeScript execution for Node.js
- **nodemon** - Auto-restart development server
- **socket.io** - WebSocket library for real-time communication

(you may also install the type definitions with `npm install -D @types/socket.io` if you prefer)

### 3. Setup Environment Variables
Create a `.env` file in the root directory (copy from `.env.example`):
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/talkflow
NODE_ENV=development
```

**Note:** 
- For local development: Use `mongodb://localhost:27017/talkflow`
- For MongoDB Atlas: Use your connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 4. Ensure MongoDB is Running
- **Windows:** MongoDB should be running as a service
- **macOS/Linux:** Start MongoDB with `mongod`
- **Docker:** Run `docker run -d -p 27017:27017 --name mongodb mongo`

### 5. Build TypeScript
```bash
npm run build
```

This compiles TypeScript files from `src/` to `dist/`

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── index.ts                 # Entry point
├── controllers/             # Request handlers
├── models/                  # Typegoose models (User.ts)
├── routes/                  # API routes
├── types/                   # TypeScript types (database.ts)
└── utils/                   # Helper functions (db.ts)
dist/                        # Compiled JavaScript (generated)
```

## Database Models

The project includes the following Typegoose models:

1. **Profile** - User profiles
2. **Message** - Chat messages
3. **FriendRequest** - Friend request management
4. **Call** - Call records (audio/video)
5. **BlockedUser** - Blocked users list
6. **TypingIndicator** - Real-time typing indicators

All models are exported from `src/models/User.ts`

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running on `localhost:27017`
- Check `MONGODB_URI` in `.env` file
- Ensure database permissions are correct

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process: `lsof -ti:3000 | xargs kill -9` (macOS/Linux)

### TypeScript Compilation Errors
- Delete `dist/` folder: `rm -rf dist`
- Run `npm run build` again

## Next Steps

1. Create API routes in `src/routes/`
2. Create controllers in `src/controllers/`
3. Implement API endpoints using the models
4. Add authentication/authorization
5. Setup WebSocket for real-time features (calls, typing indicators)

---

**Happy Coding! 🚀**
