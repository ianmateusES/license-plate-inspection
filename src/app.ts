import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import '@app/containers';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

import {
  createConnectionPostgres,
  createConnectionMongo,
} from '@database/index';
import { AppError } from '@errors/AppError';

import { routes } from './routes';
import { socketServer } from './socket';

createConnectionPostgres('localhost');
createConnectionMongo();

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use((req: Request, _: Response, next: NextFunction) => {
  req.realtime = { io };

  return next();
});

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

io.on('connection', (socket: Socket) => {
  socketServer(io, socket);
});

export { server };
