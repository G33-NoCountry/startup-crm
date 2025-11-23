export class RegisterUserAdminDto {
  constructor(
    public full_name: string,
    public email: string,
    public password: string,
    public role: string,
  ) {}
}
