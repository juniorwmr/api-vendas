import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { AppError } from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';

type IRequest = {
  email: string;
  password: string;
};

interface IUser extends Omit<User, 'password'> {
  password?: string;
}

type IResponse = {
  user: IUser;
  token: string;
  expiresIn: string;
};

export class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new AppError('Incorrect e-mail or password.', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect password.', 401);
    }

    const { accessToken, expiresIn } = user.createToken(user);

    const tempUser: IUser = user;

    delete tempUser.password;

    return {
      user: tempUser,
      token: accessToken,
      expiresIn,
    };
  }
}
