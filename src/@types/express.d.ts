import { Server } from 'socket.io';
import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      realtime: {
        io: Server;
      };
    }
  }
}