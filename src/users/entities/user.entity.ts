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

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;

  @OneToOne(() => Roles, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  role: Roles;

  @OneToMany(() => Post, (post: Post) => post.author, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
