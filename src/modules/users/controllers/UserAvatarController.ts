import { Request, Response } from 'express';

import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { originalname } = request.file as Express.Multer.File;

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      user_id: id,
      avatarFilename: originalname,
    });

    return response.status(200).json(user);
  }
}
