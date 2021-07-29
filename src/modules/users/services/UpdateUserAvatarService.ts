import path from 'path';
import fs from 'fs';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';

import multerConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new AppError('User not found.');
    }

    const userAvatarFileName = `${user_id}-${avatarFilename}`;

    if (user.avatar && user.avatar !== userAvatarFileName) {
      const userAvatarFilePath = path.join(multerConfig.dest, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = userAvatarFileName;

    await userRepository.save(user);

    return user;
  }
}
