export class UpdateTaskDto {
  constructor(
    public id: number,
    public title?: string,
    public due_date?: Date,
    public status?: boolean,
  ) { }
}
