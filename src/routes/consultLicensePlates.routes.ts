import { Router } from 'express';
import multer from 'multer';

import { ConsultLicensePlateController } from '@app/controllers';
import { configUpload } from '@config/upload';

const uploadImg = multer(configUpload.multer);

// URL: http://${url}:${port}/consult_license_plates
const consultLicensePlatesRoutes = Router();

const consultLicensePlateController = new ConsultLicensePlateController();

consultLicensePlatesRoutes.post(
  '/',
  uploadImg.single('image'),
  consultLicensePlateController.store,
);

consultLicensePlatesRoutes.get('/', consultLicensePlateController.index);

consultLicensePlatesRoutes.get(
  '/:consult_license_plate_id',
  consultLicensePlateController.show,
);

consultLicensePlatesRoutes.patch(
  '/:consult_license_plate_id',
  uploadImg.single('image'),
  consultLicensePlateController.update,
);

consultLicensePlatesRoutes.delete(
  '/:consult_license_plate_id',
  consultLicensePlateController.destroy,
);

export { consultLicensePlatesRoutes };
