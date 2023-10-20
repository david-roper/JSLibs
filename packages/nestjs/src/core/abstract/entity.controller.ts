export abstract class EntityController<TEntity extends object> {
  abstract create(entity: object): object;

  abstract deleteById(id: string): object;

  abstract findAll(): Promise<object[]>;

  abstract findById(id: string): Promise<object>;

  abstract updateById(id: string, update: Partial<Omit<TEntity, 'id'>>): Promise<object>;
}
