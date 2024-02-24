import crypto from 'crypto';
import * as fs from 'fs';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

if (!fs.existsSync(tmpFolder)) {
  fs.mkdirSync(tmpFolder, { recursive: true });
}

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };

  url: string;

  config: {
    // disk: {};
    aws: {
      bucket: string;
    };
  };
}

const configUpload = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.join(tmpFolder, 'upload'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        let filename: string;
        if (!file.originalname.includes('-@-')) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          filename = `${fileHash}-@-${file.originalname}`;
        } else {
          filename = file.originalname;
        }

        return callback(null, filename);
      },
    }),
  },

  url: process.env.APP_UPLOAD_URL,

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;

export { configUpload };
