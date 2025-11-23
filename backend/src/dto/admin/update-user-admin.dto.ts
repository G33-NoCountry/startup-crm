export class UpdateUserAdminDto {
  constructor(
    public id: number,
    public full_name?: string,
    public email?: string,
    public role?: 'Admin' | 'Agente' | 'Manager',
    public status?: boolean,
  ) {
  }
}
