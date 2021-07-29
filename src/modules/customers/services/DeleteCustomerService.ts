import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findOne({ id });

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customerRepository.remove(customer);
  }
}
