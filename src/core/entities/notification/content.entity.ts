export class ContentEntity {
  private readonly content: string;

  constructor(content: string) {
    const isValidLength = this.validateContentLength(content);

    if (!isValidLength) {
      throw new Error('Content must be between 1 and 255 characters');
    }

    this.content = content;
  }

  public get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length > 0 && content.length <= 255;
  }
}
