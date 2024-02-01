import { Router } from 'express';
import teamRouter from './teamRoutes';
import loginRouter from './loginRoutes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
