import serverless from 'serverless-http';
import { app } from './server';

export const api = serverless(app);
