import { Response } from "src/helpers/response";

export interface UseCase {
  handle(...args: any[]): Promise<Response>;
}