export class RegisterContactDto {
  constructor(
    public full_name: string,
    public email: string,
    public phone?: string,
  ) {}
}
