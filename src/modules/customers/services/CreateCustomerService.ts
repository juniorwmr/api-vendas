import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { AppError } from '@shared/errors/AppError';
import { Customer } from '../typeorm/entities/Customer';

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customerAlreadyExists = await customerRepository.findByEmail(email);
    if (customerAlreadyExists) {
      throw new AppError('E-mail address already used.');
    }
    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}
