export abstract class Service<T = void, U = void> {
  abstract execute(args?: T): Promise<U> | U;
}