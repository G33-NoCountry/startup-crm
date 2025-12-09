export class UpdateTaskDto {
  constructor(
    public id: number,
    public title?: string,
    public start_date?: Date,
    public due_date?: Date,
    public status?: boolean,
    public color?: string,
  ) { }
}
