import { IResponseUltimateAlprAPIDTO } from 'api/ultimateAlprAPI/dtos';
import FormData from 'form-data';

import { ultimateAlprAPI } from '@api/index';

import { deleteFile } from './deleteFile';
import { openFile } from './openFile';

const consultOcr = async (
  image_name: string,
  deleted = false,
): Promise<IResponseUltimateAlprAPIDTO> => {
  const { fileContent } = openFile(image_name);

  const formData = new FormData();
  formData.append('image', fileContent, image_name);

  const response = await ultimateAlprAPI.post('/recognizer', formData, {
    headers: formData.getHeaders(),
  });
  const data = response.data as IResponseUltimateAlprAPIDTO;

  if (deleted) {
    deleteFile(image_name);
  }

  return data;
};

export { consultOcr };
