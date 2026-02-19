import { NextFunction, Request, Response } from 'express';
import { _createOrder, _getOrderById } from '@/services/orders';
import { Order } from '@/schemas/orderSchema';

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body as Order;
    const response = await _createOrder(data);
    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const response = await _getOrderById(id);
    res.json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
}
