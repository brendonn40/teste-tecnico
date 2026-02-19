import express from 'express';
import authRoutes from '@/routes/auth';
import orderRoutes from '@/routes/orders';
import itemRoutes from '@/routes/items';
import auth from '@/middlewares/auth';
const router = express.Router();

router.use('/auth', authRoutes);

router.get("/health", (req: any, res: any) => {
    res.json({ ok: true });
});
// router.use('/orders',auth, orderRoutes);
router.use('/orders', orderRoutes);
router.use('/items', itemRoutes);


export default router;
