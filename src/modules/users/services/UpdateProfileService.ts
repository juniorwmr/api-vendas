import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { User } from '../typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user_id })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await userRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this e-mail.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    console.log(user.password);

    if (password && old_password) {
      const checkedOldPassword = await compare(old_password, user.password);

      if (!checkedOldPassword) {
        throw new AppError('Old password does not match.');
      }
      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}
