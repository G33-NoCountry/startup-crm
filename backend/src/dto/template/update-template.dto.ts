export class UpdateTemplateDto {
  constructor(
    public id: number,
    public title?: string,
    public channel?: "whatsapp" | "email",
    public content?: string,
    public status?: boolean,
  ) { }
}
