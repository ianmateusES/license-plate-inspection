import { server } from './app';

const port = 3333;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application started in port ${port}`);
});
