import { Request, Response } from 'express';
import { SendForgetPasswordEmailService } from '@modules/users/services/SendForgetPasswordEmailService';

export class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgetPasswordEmailService = new SendForgetPasswordEmailService();
    await sendForgetPasswordEmailService.execute({ email });

    return response.status(204).send();
  }
}
