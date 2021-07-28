import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { ListUserService } from '../services/ListUserService';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    return response.status(200).json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    return response.status(200);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const product = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.status(200);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.status(203);
  }
}
