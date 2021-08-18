import { getCustomRepository } from 'typeorm';

import { IRequest } from '../../@types/services';
import UsersRepository from '../../Repositories/UsersRepository';

export default class CreateUserService {
  async execute(request: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const { username, password, email } = request;

    const user = usersRepository.create({
      username,
      password,
      email,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
