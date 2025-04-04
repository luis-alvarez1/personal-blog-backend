import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/roles/entities/roles.entity';
import bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  private readonly logger = new Logger(UsersService.name);
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
      const defaultRole = await this.rolesRepository.findOne({
        where: { role: 'user' },
      });

      if (!defaultRole) {
        throw new NotFoundException('Default role not found');
      }
      const userData: Partial<User> = {
        ...createUserDto,
        role: defaultRole,
        password: hashedPassword,
      };
      const user = this.usersRepository.create(userData);
      return this.usersRepository.save(user);
    } catch (error) {
      this.logger.log(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
