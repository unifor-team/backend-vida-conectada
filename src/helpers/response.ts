
interface ResponseParams {
  status: number;
  message: string;
}

export class Response {
  private status: number;
  private message: string;

  constructor(response: ResponseParams) {
    this.status = response.status;
    this.message = response.message;
  }

  response(): Response {
    return new Response({
      status: this.status,
      message: this.message
    });
  }
}