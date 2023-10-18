import { type EntityController } from './entity-controller.interface';

export type EntityService<T extends object> = EntityController<T>;
