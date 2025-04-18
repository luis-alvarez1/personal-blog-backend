import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Roles } from 'src/roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Roles])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
