export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}