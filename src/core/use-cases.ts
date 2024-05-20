export interface UseCase<TModel> {
  handle(...args: any[]): Promise<TModel>;
}