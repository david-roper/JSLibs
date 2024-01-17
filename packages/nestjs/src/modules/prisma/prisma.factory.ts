import { Prisma, PrismaClient } from '@prisma/client';

export const PRISMA_CLIENT_TOKEN = 'PRISMA_CLIENT';

type CreateClientOptions = {
  datasourceUrl: string;
};

export class PrismaFactory {
  static createClient(this: void, options: CreateClientOptions) {
    return new PrismaClient({ datasourceUrl: options.datasourceUrl }).$extends({
      model: {
        $allModels: {
          get __model__() {
            const context = Prisma.getExtensionContext(this);
            return context.$name;
          },
          async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
            const context = Prisma.getExtensionContext(this) as unknown as {
              findFirst: (...args: any[]) => Promise<unknown>;
            };
            const result = await context.findFirst({ where });
            return result !== null;
          }
        }
      },
      result: {
        instrumentModel: {
          toInstance: {
            compute({ bundle }) {
              return function <TKind extends InstrumentKind>(options?: InstrumentInterpreterOptions<TKind>) {
                const interpreter = new InstrumentInterpreter();
                return interpreter.interpret(bundle, options);
              };
            },
            needs: { bundle: true }
          }
        }
      }
    });
  }
}

export type ExtendedPrismaClient = ReturnType<typeof PrismaFactory.createClient>;
