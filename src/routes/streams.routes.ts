import { Router } from 'express';
import multer from 'multer';

import { StreamController } from '@app/controllers';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// URL: http://${url}:${port}/stream
const streamsRoutes = Router();

const streamController = new StreamController();

streamsRoutes.post('/', upload.single('image'), streamController.store);

export { streamsRoutes };
