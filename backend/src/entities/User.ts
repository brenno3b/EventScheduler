import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

import { hash } from '../libs/bcrypt';
import uuid from '../libs/uuid';

@Entity('Users')
export default class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
