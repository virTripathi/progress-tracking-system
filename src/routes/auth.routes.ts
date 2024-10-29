import express from 'express';
import { login, logout } from '../controllers/auth.controller';
import { loginRequest } from '../requests/loginRequest';
import { authenticateToken } from '../middlewares/auth.middleware';

const authRouter = express.Router();

authRouter.post('/login',loginRequest as any, login as any);
authRouter.post('/logout',authenticateToken as any, logout as any);

export default authRouter;
