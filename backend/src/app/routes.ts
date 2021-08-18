import { Request, Response, Router } from 'express';

import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

const authController = new AuthController();

router.get('/login', authController.login);
router.post('/signup', authController.signup);

router.get(
  '/status',
  authMiddleware,
  (request: Request, response: Response) => {
    return response.sendStatus(200);
  }
);

export default router;
