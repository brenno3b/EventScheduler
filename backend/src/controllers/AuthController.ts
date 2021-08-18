import { Request, Response } from 'express';

import SignupService from '../services/auth/SignupService';
import LoginService from '../services/auth/LoginService';

export default class AuthController {
  async login(request: Request, response: Response) {
    const loginService = new LoginService();

    const { user, token } = await loginService.execute(request.body);

    return response.json({ user, token });
  }

  async signup(request: Request, response: Response) {
    const signupService = new SignupService();

    const user = await signupService.execute(request.body);

    return response.status(201).json(user);
  }
}
