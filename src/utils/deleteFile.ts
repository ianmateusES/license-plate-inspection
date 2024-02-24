import fs from 'fs';
import path from 'path';

import { configUpload } from '@config/upload';

const deleteFile = async file => {
  const originalPath = path.resolve(configUpload.tmpFolder, file);
  try {
    await fs.promises.stat(originalPath);
  } catch {
    return;
  }

  await fs.promises.unlink(originalPath);
};

export { deleteFile };
