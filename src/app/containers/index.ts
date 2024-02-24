import './providers';

import { container } from 'tsyringe';

import {
  IConsultLicensePlateRepository,
  ILicensePlateEventRepository,
  IPagazulRepository,
  IUltimateAlprRepository,
} from '@app/repositories';
import {
  ConsultLicensePlateRepository,
  LicensePlateEventRepository,
  PagazulRepository,
  UltimateAlprRepository,
} from '@orm/repositories';

container.registerSingleton<ILicensePlateEventRepository>(
  'LicensePlateEventRepository',
  LicensePlateEventRepository,
);

container.registerSingleton<IConsultLicensePlateRepository>(
  'ConsultLicensePlateRepository',
  ConsultLicensePlateRepository,
);

container.registerSingleton<IPagazulRepository>(
  'PagazulRepository',
  PagazulRepository,
);

container.registerSingleton<IUltimateAlprRepository>(
  'UltimateAlprRepository',
  UltimateAlprRepository,
);
