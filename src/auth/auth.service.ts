import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      const passwordMatches = bcrypt.compareSync(password, user.password);

      if (passwordMatches) {
        return this.usersService.cleanData(user);
      }
      return null;
    } catch (error) {
      this.logger.log(`Error validating User: ${error}`);

      throw error;
    }
  }

  login(user: User) {
    const payload = { username: user.name, sub: user.id };

    return { token: this.jwtService.sign(payload) };
  }
}
