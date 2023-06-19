import { randomUUID } from 'node:crypto';
import { Replace } from '@shared/helpers/replace';
import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';

export interface NotificationProps {
  content: Content;
  category: Category;
  readAt?: Date | null;
  createdAt: Date;
  recipientId: string;
  canceledAt?: Date | null;
}

export class NotificationEntity {
  private props: NotificationProps;
  private _id: string;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string) {
    this._id = !id ? randomUUID() : id;

    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: Category) {
    this.props.category = category;
  }

  public get category(): Category {
    return this.props.category;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public cancel(): void {
    this.props.canceledAt = new Date();
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public unread(): void {
    this.props.readAt = null;
  }
}
