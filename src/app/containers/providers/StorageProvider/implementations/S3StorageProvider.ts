import fs from 'fs';
import mime from 'mime';
import path from 'path';

import { S3 } from '@aws-sdk/client-s3';
import { configUpload } from '@config/upload';

import { IStorageProvider } from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile(file: string, folder: string): Promise<string> {
    const originalPath = path.resolve(configUpload.tmpFolder, file);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not Found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: configUpload.config.aws.bucket,
      Key: `${folder}/${file}`,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    });

    // await fs.promises.rename(
    //   path.resolve(configUpload.tmpFolder, file),
    //   path.resolve(configUpload.uploadsFolder, folder, file),
    // );

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${configUpload.config.aws.bucket}/${folder}`,
      Key: file,
    });
    const filePath = path.resolve(configUpload.uploadsFolder, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { S3StorageProvider };
