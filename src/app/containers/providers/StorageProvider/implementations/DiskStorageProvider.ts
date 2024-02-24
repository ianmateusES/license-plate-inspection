import { configUpload } from '@config/upload';
import fs from 'fs';
import path from 'path';

import { IStorageProvider } from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string, folder: string): Promise<string> {
    if (!fs.existsSync(path.resolve(configUpload.uploadsFolder, folder))) {
      fs.mkdirSync(path.resolve(configUpload.uploadsFolder, folder), {
        recursive: true,
      });
    }

    await fs.promises.rename(
      path.resolve(configUpload.tmpFolder, file),
      path.resolve(configUpload.uploadsFolder, folder, file),
    );

    return file;
  }

  public async deleteFile(file: string, folder: string): Promise<void> {
    const filePath = path.resolve(configUpload.uploadsFolder, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteFileLocal(file: string): Promise<void> {
    const filePath = path.resolve(configUpload.tmpFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProvider };
