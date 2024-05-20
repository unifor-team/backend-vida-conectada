import { Entity } from "../../core/entity";

export class User extends Entity {
  private name: string;
  private password: string;
  private email: string;
  private created_at: Date;

  constructor() {
    super();
  }

  static build(): User {
    return new User();
  }

  public getName(): string {
    return this.name;
  }

  public getPassword(): string {
    return this.password;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public setName(value: string) {
    this.name = value;
  }

  public setPassword(value: string) {
    this.password = value;
  }

  public setEmail(value: string) {
    this.email = value;
  }

  public setCreatedAt(value: Date) {
    this.created_at = value;
  }
}