export class UpdateUserDto {
  constructor(
    public id: number,
    public full_name?: string,
    public email?: string,
  ) {}
}
