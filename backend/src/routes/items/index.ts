import express from 'express';
import { getItems } from '@/controllers/items';

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', getItems);

export default router;
