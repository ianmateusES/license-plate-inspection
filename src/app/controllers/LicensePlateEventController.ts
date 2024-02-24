import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateLicensePlateEventService,
  DeleteLicensePlateEventService,
  ShowLicensePlateEventService,
  UpdateLicensePlateEventService,
  ListLicensePlateEventService,
} from '@app/services/licensePlateEvents';
import { parseQueryParamsArray } from '@utils/parseQueryParamsArray';

class LicensePlateEventController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { plate, bound_box, date_hour, camera_id, latitude, longitude } =
      req.body;
    const { filename: image_name } = req.file;
    const { io } = req.realtime;

    const createLicensePlateEventService = container.resolve(
      CreateLicensePlateEventService,
    );

    const licensePlateEvent = await createLicensePlateEventService.execute({
      image_name,
      bound_box,
      camera_id,
      latitude,
      longitude,
      date_hour,
      plate,
      io,
    });

    return res.status(201).json(instanceToInstance(licensePlateEvent));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const {
      page,
      size,
      camera_ids,
      external_pagazul_id,
      pagazul_expired,
      pagazul_status,
      plates,
    } = req.query;

    const listLicensePlateEventService = container.resolve(
      ListLicensePlateEventService,
    );

    const { data, meta } = await listLicensePlateEventService.execute({
      page: Number(page) || undefined,
      size: Number(size) || undefined,
      camera_ids: parseQueryParamsArray(camera_ids as string),
      plates: parseQueryParamsArray(plates as string),
      external_pagazul_id: external_pagazul_id
        ? (external_pagazul_id as string)
        : undefined,
      pagazul_expired: pagazul_expired
        ? (pagazul_expired as string)
        : undefined,
      pagazul_status: pagazul_status ? (pagazul_status as string) : undefined,
    });

    return res.status(200).json({ data: instanceToInstance(data), meta });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { license_plate_event_id } = req.params;

    const showLicensePlateEventService = container.resolve(
      ShowLicensePlateEventService,
    );

    const licensePlateEvent = await showLicensePlateEventService.execute({
      license_plate_event_id,
    });

    return res.status(200).json(instanceToInstance(licensePlateEvent));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { license_plate_event_id } = req.params;
    const { plate, latitude, longitude } = req.body;
    const { io } = req.realtime;

    let image_name: string;
    if (req.file) {
      image_name = req.file.filename;
    }

    const updateLicensePlateEventService = container.resolve(
      UpdateLicensePlateEventService,
    );

    const licensePlateEvent = await updateLicensePlateEventService.execute({
      license_plate_event_id,
      plate,
      image_name,
      latitude,
      longitude,
      io,
    });

    return res.status(200).json(instanceToInstance(licensePlateEvent));
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { license_plate_event_id } = req.params;
    const { io } = req.realtime;

    const deleteLicensePlateEventService = container.resolve(
      DeleteLicensePlateEventService,
    );

    await deleteLicensePlateEventService.execute({
      license_plate_event_id,
      io,
    });

    return res.status(202).send();
  }
}

export { LicensePlateEventController };
