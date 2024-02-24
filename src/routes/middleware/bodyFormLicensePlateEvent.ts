import { Request, Response, NextFunction } from 'express';
import is from 'type-is';

import { AppError } from '@errors/AppError';

export async function bodyFormLicensePlateEvent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!is(req, ['multipart'])) return next();

  req.body = JSON.parse(JSON.stringify(req.body));

  if (req.body.bound_box) {
    req.body.bound_box = JSON.parse(req.body.bound_box);
  }

  if (req.body.latitude && req.body.longitude) {
    Object.assign(req.body, {
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
    });
  }

  return next();
}
