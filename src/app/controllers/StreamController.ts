import { Request, Response } from 'express';

import { ESocketTypeEvent } from '@utils/enums';

class StreamController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { camera_id } = req.body;
    const image_data = req.file.buffer.toString('base64');
    const { io } = req.realtime;

    io.emit(ESocketTypeEvent.STREAM, { camera_id, image: image_data });

    return res.status(200).send();
  }
}

export { StreamController };
