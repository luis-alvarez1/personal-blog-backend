import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  //   @ManyToOne(() => User, (user: User) => user.posts)
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: number;
}
