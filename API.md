# TalkFlow Server - API Documentation

**Simple. Scalable. Industry-Level.**

## Project Structure

```
src/
├── index.ts                    # Main entry point
├── controllers/                # Business logic
│   ├── profileController.ts
│   ├── messageController.ts
│   ├── friendRequestController.ts
│   └── callController.ts
├── routes/                     # API routes
│   ├── profileRoutes.ts
│   ├── messageRoutes.ts
│   ├── friendRequestRoutes.ts
│   └── callRoutes.ts
├── models/                     # MongoDB models
│   ├── Profile.ts
│   ├── Message.ts
│   ├── FriendRequest.ts
│   ├── Call.ts
│   ├── BlockedUser.ts
│   ├── TypingIndicator.ts
│   └── index.ts
├── middleware/
│   └── errorHandler.ts
├── utils/
│   └── db.ts                   # Database connection
└── types/
    └── database.ts             # Type definitions
```

## API Endpoints

### Profiles
- `POST /api/profiles` - Create profile
- `GET /api/profiles/:id` - Get profile
- `PUT /api/profiles/:id` - Update profile
- `DELETE /api/profiles/:id` - Delete profile

### Messages
- `POST /api/messages/send` - Send message
- `GET /api/messages/conversation?senderId=X&receiverId=Y` - Get conversation
- `GET /api/messages/typing?userId=X&chatWith=Y` - Fetch last typing indicator record for a conversation
- `DELETE /api/messages/:id` - Delete message

### Friend Requests
- `POST /api/friend-requests/send` - Send friend request
- `PUT /api/friend-requests/:id/accept` - Accept request
- `DELETE /api/friend-requests/:id/reject` - Reject request

### Calls
- `POST /api/calls/initiate` - Start call
- `PUT /api/calls/:id/accept` - Accept call
- `PUT /api/calls/:id/end` - End call

## Example Requests

### Create Profile
```bash
POST /api/profiles
Content-Type: application/json

{
  "id": "user123",
  "username": "john_doe"
}
```

### Send Message
```bash
POST /api/messages/send
Content-Type: application/json

{
  "id": "msg001",
  "sender_id": "user1",
  "receiver_id": "user2",
  "content": "Hello!"
}
```

### Send Friend Request
```bash
POST /api/friend-requests/send
Content-Type: application/json

{
  "sender_id": "user1",
  "receiver_id": "user2"
}
```

### Initiate Call
```bash
POST /api/calls/initiate
Content-Type: application/json

{
  "caller_id": "user1",
  "receiver_id": "user2",
  "call_type": "audio"
}
```

## Running the Server

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Features

✓ Simple, readable code
✓ Scalable architecture
✓ RESTful API design
✓ MongoDB integration with Typegoose
✓ Error handling middleware
✓ Environment configuration
✓ TypeScript support

---

## WebSocket Events

The server exposes a Socket.io namespace on the same host as the REST API. After connecting clients should emit a `join` event with their user ID so that they are placed in a personal room. Example:

```js
// client side
const socket = io("http://localhost:3000");
socket.emit("join", "user123");
```

Once joined, the following real‑time events are available:

- `newMessage` – emitted to a receiver when a message is sent. Payload is the `Message` object.
- `typing` – emitted by the typing user with `{from, to, isTyping}`; forwarded to the `to` user.
- `incomingCall` – informs a user that someone is calling them, payload is the `Call` object.
- `callAccepted` – sent to the caller when the receiver accepts the call.
- `callEnded` – broadcast to the other participant when a call ends.
- `friendRequest` – sent to a receiver when they receive a new friend request.
- `friendRequestAccepted` / `friendRequestRejected` – notify the sender of the final status.

Any other custom events may be added as needed.

---

**WebSockets have been integrated into the server; REST endpoints now emit corresponding events.**
