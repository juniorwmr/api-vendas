import { Router } from 'express';

const router = Router();

router
  .get('/', (request, response) => {
    return response.json({ message: 'Hello, Dev!' });
  })

  .get('/users', (request, response) => {
    return response.json([
      {
        id: 1,
        name: 'Washington Muniz',
      },
      {
        id: 2,
        name: 'André Luiz',
      },
    ]);
  });

export { router };
