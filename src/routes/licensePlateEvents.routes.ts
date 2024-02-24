import { Router } from 'express';
import multer from 'multer';

import { LicensePlateEventController } from '@app/controllers';
import { configUpload } from '@config/upload';

import { bodyFormLicensePlateEvent } from './middleware/bodyFormLicensePlateEvent';

const uploadImg = multer(configUpload.multer);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// URL: http://${url}:${port}/license_plate_events
const licensePlateEventsRoutes = Router();

const licensePlateEventController = new LicensePlateEventController();

licensePlateEventsRoutes.post(
  '/',
  uploadImg.single('image'),
  bodyFormLicensePlateEvent,
  licensePlateEventController.store,
);

licensePlateEventsRoutes.get('/', licensePlateEventController.index);

licensePlateEventsRoutes.get(
  '/:license_plate_event_id',
  licensePlateEventController.show,
);

licensePlateEventsRoutes.patch(
  '/:license_plate_event_id',
  uploadImg.single('image'),
  licensePlateEventController.update,
);

licensePlateEventsRoutes.delete(
  '/:license_plate_event_id',
  licensePlateEventController.destroy,
);

export { licensePlateEventsRoutes };
