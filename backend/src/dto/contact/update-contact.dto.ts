export class UpdateContactDto {
  constructor(
    public id: number,
    public full_name?: string,
    public email?: string,
    public phone?: string,
    public tags_id?: number[],
  ) { }
}
