import { randomUUID } from 'node:crypto';
import { ContentEntity } from './content.entity';
import { Replace } from '@shared/helpers/replace';

export interface NotificationProps {
  content: ContentEntity;
  category: string;
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

  public set content(content: ContentEntity) {
    this.props.content = content;
  }

  public get content(): ContentEntity {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
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
