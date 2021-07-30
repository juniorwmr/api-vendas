import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowProfileService } from '../services/ShowProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({ user_id });
    return response.status(200).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const requestData = { ...request.body, user_id: request.user.id };
    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute(requestData);
    return response.status(200).json(classToClass(user));
  }
}
