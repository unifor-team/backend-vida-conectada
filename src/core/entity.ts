export class Entity {
  id?: number;

  static build(): Entity {
    throw new Error('Must be implemented by subclass');
  }
}