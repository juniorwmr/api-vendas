import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

import { User } from '@modules/users/typeorm/entities/User';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/user_tokens/typeorm/repositories/UserTokenRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('Token not found.');
    }

    const user = await userRepository.findOne({ id: userToken.user_id });
    if (!user) {
      throw new AppError('User not found.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token has expired.');
    }

    const passwordHash = await hash(password, 10);

    user.password = passwordHash;

    await userRepository.save(user);

    return user;
  }
}
