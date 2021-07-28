import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { secretKey } from '@config/jwt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }

  createToken(user: User) {
    const expiresIn = '10m';
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      secretKey,
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }
}
