import { hashSync } from "bcrypt";
import { RegisterUserDto } from "../dto/auth/register-user.dto";
import { User } from "../models";
import { randomHexColor } from "../utils/hex-color";
import { UpdateUserDto } from "../dto/user/update-user.dto";

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
      role: dto.role ?? 'Agente',
      status: 1,
      avatar_color: color
    });
    return user;
  }

  public async updateUser(dto: UpdateUserDto) {
    const rows = await User.update(
      {
        full_name: dto.full_name,
        email: dto.email,
      },
      { where: { id: dto.id } }
    );
    return rows.length > 0;
  }

  public async getByPk(id: number) {
    return await User.findByPk(id);
  }

  public async getUsersPaginate(limit: number | undefined, after?: string, before?: string, where?: any) {
    const result = await User.paginate({
      limit,
      after,
      before,
      attributes: User.publicAttributes,
      where
    });
    const items = result.edges.map(edge => edge.node);
    const cursors = {
      has_next: result.pageInfo.hasNextPage,
      has_previous: result.pageInfo.hasPreviousPage,
    };

    return {
      items: items,
      total_count: result.totalCount,
      paginate_info: {
        has_next: cursors.has_next,
        has_previous: cursors.has_previous,
        next_cursor: cursors.has_next ? result.pageInfo.endCursor : null,
        prev_cursor: cursors.has_previous ? result.pageInfo.startCursor : null,
      },
    };
  }

}
