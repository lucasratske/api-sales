import { Router } from 'express';
const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Hello, dev! ' }));

export default routes;
