import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { Customer } from '../typeorm/entities/Customer';

interface IPaginationCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: Customer[];
}

export class ListCustomerService {
  public async execute(): Promise<IPaginationCustomer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.createQueryBuilder().paginate();

    return customers as IPaginationCustomer;
  }
}
