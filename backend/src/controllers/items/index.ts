import { NextFunction, Request, Response } from 'express';
import { _getItems } from '@/services/items';

export async function getItems(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await _getItems();
    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
}



