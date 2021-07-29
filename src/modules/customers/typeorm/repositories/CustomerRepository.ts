import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  findByEmail(email: string): Promise<Customer | undefined> {
    return this.findOne({ email });
  }
}
