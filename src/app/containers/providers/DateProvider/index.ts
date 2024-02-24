import { container } from 'tsyringe';

import { DayjsDateProvider } from './implementations/DayJsDateProvider';
import { IDateProvider } from './models/IDateProvider';

const providers = {
  dayjs: DayjsDateProvider,
};

container.registerSingleton<IDateProvider>('DateProvider', providers.dayjs);
