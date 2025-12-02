export class UpdateTagDto {
  constructor(
    public id: number,
    public title?: string,
    public color?: string,
  ) {}
}
