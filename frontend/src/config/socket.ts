import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (token: string) => {
  if (!socket) {
    socket = io("http://localhost:3001/chat", {
      transports: ["websocket"],
      auth: {
        token: token, 
      },
      withCredentials: false
    });
  }
  return socket;
};