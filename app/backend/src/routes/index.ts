import { Router } from 'express';
import teamRouter from './teamRoutes';

const router = Router();

router.use('/teams', teamRouter);

export default router;
