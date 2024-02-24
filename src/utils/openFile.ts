import fs from 'fs';
import mime from 'mime';
import path from 'path';

import { configUpload } from '@config/upload';

const openFile = file => {
  const originalPath = path.resolve(configUpload.tmpFolder, file);
  const contentType = mime.getType(originalPath);

  if (!contentType) {
    throw new Error('File not Found');
  }

  const fileContent = fs.readFileSync(originalPath);

  return { fileContent, contentType };
};

export { openFile };
