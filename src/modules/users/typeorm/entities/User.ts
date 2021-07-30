import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Exclude, Expose } from 'class-transformer';

import { secretKey, expiresIn } from '../../../../config/auth';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  createToken(user: User) {
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
