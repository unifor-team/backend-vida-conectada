import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import HttpStatusCode from "src/utils/status-code";

interface ResponseParams {
  status: number;
  message: string;
  body?: any[] | any;
}

export class Response {
  private status: HttpStatusCode;
  private message: string;
  private body: any[] | any;

  constructor(response: ResponseParams) {
    this.status = response.status;
    this.message = response.message;
    this.body = response.body;
  }

  static build(params: ResponseParams): Response {
    return new Response({
      status: params.status,
      message: params.message,
      body: params.body || {}
    });
  }

  public getBody() {
    return this.body;
  }

  public setBody(body: any) {
    this.body = body;
  }
}