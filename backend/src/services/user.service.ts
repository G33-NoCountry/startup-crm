import { hashSync } from "bcrypt";
import { RegisterUserDto } from "../dto/auth/register-user.dto";
import { User } from "../models";
import { randomHexColor } from "../utils/hex-color";

export class UserService {

  public async registerUser(dto: RegisterUserDto) {
    const newUser = await this.createUser(dto);
    return newUser ?? null;
  }

  private async createUser(dto: RegisterUserDto) {
    dto.password = hashSync(dto.password, 10);
    const color = randomHexColor();
    const user: User = await User.create({
      full_name: dto.full_name,
      email: dto.email,
      password: dto.password,
      role: 'Agente',
      status: 1,
      avatar_color: color
    });
    return user;
  }

}
