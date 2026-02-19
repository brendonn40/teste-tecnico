import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers as { authorization?: string };

  if (!authorization) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (!authorization.toLowerCase().startsWith('bearer')) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const split = authorization.split('Bearer ');

  if (split.length !== 2) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const [, token] = split;
  try {
    jwt.verify(
      token.trim(),
      process.env.JWT_SECRET as string,
      function (err: any, decoded: any) {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).send({ message: 'Token expired' }); 
          }
          return res.status(401).send({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};
