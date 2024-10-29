import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { startTask, completeTask, progress } from '../controllers/task.controller';

const taskRouter = express.Router();

taskRouter.post('/start-task', authenticateToken as any, startTask as any);
taskRouter.post('/complete-task', authenticateToken as any, completeTask as any);
taskRouter.get('/progress', authenticateToken as any, progress);

export default taskRouter;
