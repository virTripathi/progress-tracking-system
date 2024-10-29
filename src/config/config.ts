import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || '',
  port: process.env.PORT || 3000,
};
