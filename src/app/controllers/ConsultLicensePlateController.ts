import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateConsultLicensePlateService,
  DeleteConsultLicensePlateService,
  ListConsultLicensePlateService,
  ShowConsultLicensePlateService,
  UpdateConsultLicensePlateService,
} from '@app/services/consultLicensePlates';

class ConsultLicensePlateController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { plate, date_hour } = req.body;
    const { io } = req.realtime;

    let image_name: string;
    if (req.file) {
      const { filename } = req.file;
      image_name = filename;
    }

    const createConsultLicensePlateService = container.resolve(
      CreateConsultLicensePlateService,
    );

    const consultLicensePlate = await createConsultLicensePlateService.execute({
      image_name,
      date_hour,
      plate,
      io,
    });

    return res.status(201).json(instanceToInstance(consultLicensePlate));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page, size } = req.query;

    const listConsultLicensePlateService = container.resolve(
      ListConsultLicensePlateService,
    );

    const { data, meta } = await listConsultLicensePlateService.execute({
      page: Number(page) || undefined,
      size: Number(size) || undefined,
    });

    return res.status(200).json({ data: instanceToInstance(data), meta });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { consult_license_plate_id } = req.params;

    const showConsultLicensePlateService = container.resolve(
      ShowConsultLicensePlateService,
    );

    const consultLicensePlate = await showConsultLicensePlateService.execute({
      consult_license_plate_id,
    });

    return res.status(200).json(instanceToInstance(consultLicensePlate));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { consult_license_plate_id } = req.params;
    const { plate } = req.body;
    const { io } = req.realtime;

    let image_name: string;
    if (req.file) {
      image_name = req.file.filename;
    }

    const updateConsultLicensePlateService = container.resolve(
      UpdateConsultLicensePlateService,
    );

    const consultLicensePlate = await updateConsultLicensePlateService.execute({
      consult_license_plate_id,
      plate,
      image_name,
      io,
    });

    return res.status(200).json(instanceToInstance(consultLicensePlate));
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { consult_license_plate_id } = req.params;
    const { io } = req.realtime;

    const deleteConsultLicensePlateService = container.resolve(
      DeleteConsultLicensePlateService,
    );

    await deleteConsultLicensePlateService.execute({
      consult_license_plate_id,
      io,
    });

    return res.status(202).send();
  }
}

export { ConsultLicensePlateController };
