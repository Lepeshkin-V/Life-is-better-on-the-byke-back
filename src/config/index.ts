import { config } from 'dotenv';

config();

export const DB_URL = process.env.DB_URL;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
