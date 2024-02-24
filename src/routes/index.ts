import express, { Router } from 'express';

import { consultLicensePlatesRoutes } from './consultLicensePlates.routes';
import { licensePlateEventsRoutes } from './licensePlateEvents.routes';
import { streamsRoutes } from './streams.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Application running' });
});

routes.use('/imgs', express.static(`${''}/events`));
routes.use('/consults', express.static(`${''}/events`));

routes.use('/stream', streamsRoutes);
routes.use('/license_plate_events', licensePlateEventsRoutes);
routes.use('/consult_license_plates', consultLicensePlatesRoutes);

export { routes };
