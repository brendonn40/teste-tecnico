import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodArray } from 'zod';

export const validate = (schema: AnyZodObject | ZodArray<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      req.body = validatedData; 
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };