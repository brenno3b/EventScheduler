import { getCustomRepository } from 'typeorm';

import UsersRepository from '../../Repositories/UsersRepository';
import AppError from '../../errors/AppError';
import { IRequest } from '../../@types/services';
import { compare } from '../../libs/bcrypt';
import { sign } from '../../libs/jwt';

export default class LoginService {
  async execute(request: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const { email, password } = request;

    const user = await usersRepository.findOne({ email });

    if (!user) throw new AppError('User not found.');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Wrong password');

    const token = await sign(user.id);

    delete user.password;

    return { user, token };
  }
}
