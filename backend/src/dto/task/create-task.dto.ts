export class CreateTaskDto {
  constructor(
    public title: string,
    public user_id: number,
    public start_date: Date,
    public due_date: Date,
    public status: boolean,
    public color: string,
    public contact_id?: number,
    public deal_id?: number,
  ) { }
}
