import express from 'express';
import { signIn, signUp } from '@/controllers/auth';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

export default router;
