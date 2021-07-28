import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

export class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();

    if (users.length === 0) {
      throw new AppError("There's not user registered.");
    }

    return users;
  }
}
