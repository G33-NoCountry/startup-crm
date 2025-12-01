export class CreateTaskDto {
  constructor(
    public title: string,
    public user_id: number,
    public due_date: Date,
    public status: boolean,
    public contact_id?: number,
    public deal_id?: number,
  ) { }
}
