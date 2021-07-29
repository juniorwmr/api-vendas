import path from 'path';

import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@modules/users/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/user_tokens/typeorm/repositories/UserTokenRepository';
import { AppError } from '@shared/errors/AppError';

import { EtherealMail } from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

export class SendForgetPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found.');
    }

    const { token } = await userTokenRepository.generate(user.id);

    const forgotPasswordTemplateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        email,
        name: user.name,
      },
      subject: 'Recuperação de Senha',
      templateData: {
        filePath: forgotPasswordTemplateFile,
        variables: {
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
