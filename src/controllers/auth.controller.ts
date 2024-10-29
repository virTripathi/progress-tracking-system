import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import knex from '../database/knex';
import { config } from '../config/config';
const jwtSecret = config.jwtSecret;

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await knex('users').where({ email }).first();
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ message: 'Invalid password' });
  
      // Generate token
      const token = generateToken(user.id);
      await knex('user_tokens').insert({ user_id: user.id, token, expires_at: new Date(Date.now() + 3600000) });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

export const logout = async (req: Request, res: Response) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  try {
    if (token) {
      await knex('user_tokens').where({ token }).update({ is_revoked: true });
      return res.json({ message: 'Logout successful' });
    }
    res.status(400).json({ message: 'Invalid token' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};
