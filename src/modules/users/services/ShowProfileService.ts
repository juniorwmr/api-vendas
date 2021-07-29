import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

export class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ id: user_id });

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
