export class CreateTemplateDto {
  constructor(
    public title: string,
    public channel: "whatsapp" | "email",
    public content: string,
    public status: boolean,
    public user_id: number,
  ) { }
}
