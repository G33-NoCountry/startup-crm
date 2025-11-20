export class RegisterUserDto {
  constructor(
    public full_name: string,
    public email: string,
    public password: string,
  ) {}
}
