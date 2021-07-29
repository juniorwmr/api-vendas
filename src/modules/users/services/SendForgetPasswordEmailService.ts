import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/user_tokens/typeorm/repositories/UserTokenRepository';
import { AppError } from '@shared/errors/AppError';
import { UserToken } from '@modules/user_tokens/typeorm/entities/UserToken';

interface IRequest {
  email: string;
}

export class SendForgetPasswordEmailService {
  public async execute({ email }: IRequest): Promise<UserToken | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found.');
    }

    const userToken = await userTokenRepository.generate(user.id);
    console.log(userToken);

    return userToken;
  }
}
