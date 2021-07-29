import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { Customer } from '../typeorm/entities/Customer';
import { AppError } from '@shared/errors/AppError';

export class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.find();

    if (customers.length === 0) {
      throw new AppError("There's not customer registered.");
    }

    return customers;
  }
}
