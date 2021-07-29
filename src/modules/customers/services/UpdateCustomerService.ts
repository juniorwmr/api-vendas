import { getCustomRepository } from 'typeorm';

import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { Customer } from '../typeorm/entities/Customer';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findOne({ id });

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerEmailExists = await customerRepository.findByEmail(email);

    if (customerEmailExists && customerEmailExists.email !== customer.email) {
      throw new AppError('There is already one user with this e-mail.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}
