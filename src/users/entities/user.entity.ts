import { Post } from 'src/posts/entities/post.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @OneToOne(() => Roles)
  @JoinColumn()
  role: Roles;

  //   @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];
}
