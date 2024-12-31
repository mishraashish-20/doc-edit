import { Server } from 'socket.io';
import Connection from "./database/db.js"
import {getDocument, updateDocument} from './controller/document-controller.js';

const PORT = 9000;
Connection()
const io = new Server(PORT, {
  //socket.io is running on which port, it takes the port and another object to manage CORS
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','DELETE'],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    socket.user = decoded; // Attach user info to socket
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  // console.log("User connected:", socket.user.userId);

  socket.on("get-document", async (documentId) => {
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await updateDocument(documentId, data);
    });
  });
});

