import { Handler } from 'express';

export const logger: Handler = (req, _, next) => {
  console.log({
    body: req.body,
    query: req.query,
    method: req.method,
    path: req.path,
  });
  next();
};
