import express from 'express';
import { createOrder, getOrderById } from '@/controllers/orders';
import { OrderFormSchema } from '@/schemas/orderSchema';
import { validate } from '@/middlewares/validate';

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post('/', validate(OrderFormSchema), createOrder);
router.get('/:id', getOrderById);

export default router;
