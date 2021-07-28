import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError('E-mail address already used.');
    }
    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}
