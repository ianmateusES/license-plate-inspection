import { Joi } from 'celebrate';
import { Server, Socket } from 'socket.io';

import { ESocketTypeEvent } from '@utils/enums';

const socketServer = (io: Server, socket: Socket) => {
  socket.on('JOIN', async (data, callback) => {});

  socket.on(ESocketTypeEvent.STREAM, async data => {
    socket.emit(ESocketTypeEvent.STREAM, data);
  });

  socket.on('disconnect', async () => {
    console.log(`Disconnect: ${socket.id}`);
  });
};

export { socketServer };
