import { Order } from './Order';
import { Product } from '../../../products/typeorm/entities/Product';

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('orders_products')
export class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @Column('uuid')
  order_id: string;

  @Column('uuid')
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
