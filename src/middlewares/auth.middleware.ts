import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import knex from '../database/knex';
import { config } from '../config/config';

const jwtSecret = config.jwtSecret;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const payload = jwt.verify(token, jwtSecret) as { userId: number };
    const isRevoked = await knex('user_tokens').where({ token, is_revoked: true }).first();

    if (isRevoked) return res.status(401).json({ message: 'Token revoked' });
    req.user = { id: payload.userId };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token', error });
  }
};
