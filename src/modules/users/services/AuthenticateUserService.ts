import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  email: string;
  token: string;
  expiresIn: string;
}

export class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail or password.', 401);
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      throw new AppError('Incorrect password.', 401);
    }

    const { accessToken, expiresIn } = user.createToken(user);

    return {
      email: user.email,
      token: accessToken,
      expiresIn,
    };
  }
}
