import express, { Request, Response } from 'express';
import authRouter from './auth.routes';
import taskRouter from './task.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/tasks', taskRouter);

export default router;
