import { Request, Response } from 'express';
import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';

export class ResetPasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordService = new ResetPasswordService();
    await resetPasswordService.execute({ password, token });

    return response.status(204).send();
  }
}
