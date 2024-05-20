import { Entity } from "../../core/entity";

export class User extends Entity {
  private _name: string;
  private _password: string;
  private _email: string;
  private _created_at: Date;

  constructor() {
    super();
  }

  static build(): User {
    return new User();
  }

  public get name(): string {
    return this._name;
  }

  public get password(): string {
    return this._password;
  }

  public get email(): string {
    return this._email;
  }

  public get createdAt(): Date {
    return this._created_at;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set password(value: string) {
    this._password = value;
  }

  public set email(value: string) {
    this._email = value;
  }

  public set createdAt(value: Date) {
    this._created_at = value;
  }
}