import { Entity } from "../../core/entity";

export class Post extends Entity {
  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;
  private content: string;
  private title: string;
  private userId: number;

  constructor() {
    super();
  }

  static build(): Post {
    return new Post();
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public setCreatedAt(date: Date) {
    this.created_at = date;
  }

  public getUpdatedAt(): Date {
    return this.updated_at;
  }

  public setUpdatedAt(date: Date) {
    this.updated_at = date;
  }

  public getDeletedAt(): Date {
    return this.deleted_at;
  }

  public setDeletedAt(date: Date) {
    this.deleted_at = date;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string) {
    this.content = content;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getUserId(): number {
    return this.userId;
  }

  public setUserId(id: number) {
    this.userId = id;
  }
}