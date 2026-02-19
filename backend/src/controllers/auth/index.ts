import { NextFunction, Request, Response } from 'express';
import { _signIn, _signUp } from '@/services/auth';

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await _signUp(req.body);
    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
}
export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await _signIn(req);
    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
}


