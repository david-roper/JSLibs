import { type EntityController } from './entity-controller.interface';

export type EntityService<TEntity extends object> = EntityController<TEntity>;
