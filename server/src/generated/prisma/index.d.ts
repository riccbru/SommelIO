
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model wine_categories
 * 
 */
export type wine_categories = $Result.DefaultSelection<Prisma.$wine_categoriesPayload>
/**
 * Model wine_category_translations
 * 
 */
export type wine_category_translations = $Result.DefaultSelection<Prisma.$wine_category_translationsPayload>
/**
 * Model tastings
 * 
 */
export type tastings = $Result.DefaultSelection<Prisma.$tastingsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wine_categories`: Exposes CRUD operations for the **wine_categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wine_categories
    * const wine_categories = await prisma.wine_categories.findMany()
    * ```
    */
  get wine_categories(): Prisma.wine_categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wine_category_translations`: Exposes CRUD operations for the **wine_category_translations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wine_category_translations
    * const wine_category_translations = await prisma.wine_category_translations.findMany()
    * ```
    */
  get wine_category_translations(): Prisma.wine_category_translationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tastings`: Exposes CRUD operations for the **tastings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tastings
    * const tastings = await prisma.tastings.findMany()
    * ```
    */
  get tastings(): Prisma.tastingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    wine_categories: 'wine_categories',
    wine_category_translations: 'wine_category_translations',
    tastings: 'tastings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "wine_categories" | "wine_category_translations" | "tastings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      wine_categories: {
        payload: Prisma.$wine_categoriesPayload<ExtArgs>
        fields: Prisma.wine_categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.wine_categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.wine_categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>
          }
          findFirst: {
            args: Prisma.wine_categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.wine_categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>
          }
          findMany: {
            args: Prisma.wine_categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>[]
          }
          create: {
            args: Prisma.wine_categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>
          }
          createMany: {
            args: Prisma.wine_categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.wine_categoriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>[]
          }
          delete: {
            args: Prisma.wine_categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>
          }
          update: {
            args: Prisma.wine_categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>
          }
          deleteMany: {
            args: Prisma.wine_categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.wine_categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.wine_categoriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>[]
          }
          upsert: {
            args: Prisma.wine_categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_categoriesPayload>
          }
          aggregate: {
            args: Prisma.Wine_categoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWine_categories>
          }
          groupBy: {
            args: Prisma.wine_categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Wine_categoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.wine_categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<Wine_categoriesCountAggregateOutputType> | number
          }
        }
      }
      wine_category_translations: {
        payload: Prisma.$wine_category_translationsPayload<ExtArgs>
        fields: Prisma.wine_category_translationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.wine_category_translationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.wine_category_translationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>
          }
          findFirst: {
            args: Prisma.wine_category_translationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.wine_category_translationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>
          }
          findMany: {
            args: Prisma.wine_category_translationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>[]
          }
          create: {
            args: Prisma.wine_category_translationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>
          }
          createMany: {
            args: Prisma.wine_category_translationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.wine_category_translationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>[]
          }
          delete: {
            args: Prisma.wine_category_translationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>
          }
          update: {
            args: Prisma.wine_category_translationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>
          }
          deleteMany: {
            args: Prisma.wine_category_translationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.wine_category_translationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.wine_category_translationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>[]
          }
          upsert: {
            args: Prisma.wine_category_translationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$wine_category_translationsPayload>
          }
          aggregate: {
            args: Prisma.Wine_category_translationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWine_category_translations>
          }
          groupBy: {
            args: Prisma.wine_category_translationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Wine_category_translationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.wine_category_translationsCountArgs<ExtArgs>
            result: $Utils.Optional<Wine_category_translationsCountAggregateOutputType> | number
          }
        }
      }
      tastings: {
        payload: Prisma.$tastingsPayload<ExtArgs>
        fields: Prisma.tastingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tastingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tastingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>
          }
          findFirst: {
            args: Prisma.tastingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tastingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>
          }
          findMany: {
            args: Prisma.tastingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>[]
          }
          create: {
            args: Prisma.tastingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>
          }
          createMany: {
            args: Prisma.tastingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tastingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>[]
          }
          delete: {
            args: Prisma.tastingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>
          }
          update: {
            args: Prisma.tastingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>
          }
          deleteMany: {
            args: Prisma.tastingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tastingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tastingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>[]
          }
          upsert: {
            args: Prisma.tastingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tastingsPayload>
          }
          aggregate: {
            args: Prisma.TastingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTastings>
          }
          groupBy: {
            args: Prisma.tastingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TastingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.tastingsCountArgs<ExtArgs>
            result: $Utils.Optional<TastingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    wine_categories?: wine_categoriesOmit
    wine_category_translations?: wine_category_translationsOmit
    tastings?: tastingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    tastings: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tastings?: boolean | UsersCountOutputTypeCountTastingsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTastingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tastingsWhereInput
  }


  /**
   * Count Type Wine_categoriesCountOutputType
   */

  export type Wine_categoriesCountOutputType = {
    tastings: number
    wine_category_translations: number
  }

  export type Wine_categoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tastings?: boolean | Wine_categoriesCountOutputTypeCountTastingsArgs
    wine_category_translations?: boolean | Wine_categoriesCountOutputTypeCountWine_category_translationsArgs
  }

  // Custom InputTypes
  /**
   * Wine_categoriesCountOutputType without action
   */
  export type Wine_categoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wine_categoriesCountOutputType
     */
    select?: Wine_categoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Wine_categoriesCountOutputType without action
   */
  export type Wine_categoriesCountOutputTypeCountTastingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tastingsWhereInput
  }

  /**
   * Wine_categoriesCountOutputType without action
   */
  export type Wine_categoriesCountOutputTypeCountWine_category_translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: wine_category_translationsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    uid: string | null
    username: string | null
    full_name: string | null
    birthdate: Date | null
    email: string | null
    password_hash: string | null
    admin: boolean | null
    premium: boolean | null
    google_id: string | null
    facebook_id: string | null
    apple_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    uid: string | null
    username: string | null
    full_name: string | null
    birthdate: Date | null
    email: string | null
    password_hash: string | null
    admin: boolean | null
    premium: boolean | null
    google_id: string | null
    facebook_id: string | null
    apple_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    uid: number
    username: number
    full_name: number
    birthdate: number
    email: number
    password_hash: number
    admin: number
    premium: number
    google_id: number
    facebook_id: number
    apple_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    uid?: true
    username?: true
    full_name?: true
    birthdate?: true
    email?: true
    password_hash?: true
    admin?: true
    premium?: true
    google_id?: true
    facebook_id?: true
    apple_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    uid?: true
    username?: true
    full_name?: true
    birthdate?: true
    email?: true
    password_hash?: true
    admin?: true
    premium?: true
    google_id?: true
    facebook_id?: true
    apple_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    uid?: true
    username?: true
    full_name?: true
    birthdate?: true
    email?: true
    password_hash?: true
    admin?: true
    premium?: true
    google_id?: true
    facebook_id?: true
    apple_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    uid: string
    username: string | null
    full_name: string | null
    birthdate: Date | null
    email: string | null
    password_hash: string | null
    admin: boolean | null
    premium: boolean | null
    google_id: string | null
    facebook_id: string | null
    apple_id: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uid?: boolean
    username?: boolean
    full_name?: boolean
    birthdate?: boolean
    email?: boolean
    password_hash?: boolean
    admin?: boolean
    premium?: boolean
    google_id?: boolean
    facebook_id?: boolean
    apple_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    tastings?: boolean | users$tastingsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uid?: boolean
    username?: boolean
    full_name?: boolean
    birthdate?: boolean
    email?: boolean
    password_hash?: boolean
    admin?: boolean
    premium?: boolean
    google_id?: boolean
    facebook_id?: boolean
    apple_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uid?: boolean
    username?: boolean
    full_name?: boolean
    birthdate?: boolean
    email?: boolean
    password_hash?: boolean
    admin?: boolean
    premium?: boolean
    google_id?: boolean
    facebook_id?: boolean
    apple_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    uid?: boolean
    username?: boolean
    full_name?: boolean
    birthdate?: boolean
    email?: boolean
    password_hash?: boolean
    admin?: boolean
    premium?: boolean
    google_id?: boolean
    facebook_id?: boolean
    apple_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uid" | "username" | "full_name" | "birthdate" | "email" | "password_hash" | "admin" | "premium" | "google_id" | "facebook_id" | "apple_id" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tastings?: boolean | users$tastingsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      tastings: Prisma.$tastingsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uid: string
      username: string | null
      full_name: string | null
      birthdate: Date | null
      email: string | null
      password_hash: string | null
      admin: boolean | null
      premium: boolean | null
      google_id: string | null
      facebook_id: string | null
      apple_id: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tastings<T extends users$tastingsArgs<ExtArgs> = {}>(args?: Subset<T, users$tastingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly uid: FieldRef<"users", 'String'>
    readonly username: FieldRef<"users", 'String'>
    readonly full_name: FieldRef<"users", 'String'>
    readonly birthdate: FieldRef<"users", 'DateTime'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly admin: FieldRef<"users", 'Boolean'>
    readonly premium: FieldRef<"users", 'Boolean'>
    readonly google_id: FieldRef<"users", 'String'>
    readonly facebook_id: FieldRef<"users", 'String'>
    readonly apple_id: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data?: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.tastings
   */
  export type users$tastingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    where?: tastingsWhereInput
    orderBy?: tastingsOrderByWithRelationInput | tastingsOrderByWithRelationInput[]
    cursor?: tastingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TastingsScalarFieldEnum | TastingsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model wine_categories
   */

  export type AggregateWine_categories = {
    _count: Wine_categoriesCountAggregateOutputType | null
    _avg: Wine_categoriesAvgAggregateOutputType | null
    _sum: Wine_categoriesSumAggregateOutputType | null
    _min: Wine_categoriesMinAggregateOutputType | null
    _max: Wine_categoriesMaxAggregateOutputType | null
  }

  export type Wine_categoriesAvgAggregateOutputType = {
    id: number | null
  }

  export type Wine_categoriesSumAggregateOutputType = {
    id: number | null
  }

  export type Wine_categoriesMinAggregateOutputType = {
    id: number | null
    code: string | null
  }

  export type Wine_categoriesMaxAggregateOutputType = {
    id: number | null
    code: string | null
  }

  export type Wine_categoriesCountAggregateOutputType = {
    id: number
    code: number
    _all: number
  }


  export type Wine_categoriesAvgAggregateInputType = {
    id?: true
  }

  export type Wine_categoriesSumAggregateInputType = {
    id?: true
  }

  export type Wine_categoriesMinAggregateInputType = {
    id?: true
    code?: true
  }

  export type Wine_categoriesMaxAggregateInputType = {
    id?: true
    code?: true
  }

  export type Wine_categoriesCountAggregateInputType = {
    id?: true
    code?: true
    _all?: true
  }

  export type Wine_categoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wine_categories to aggregate.
     */
    where?: wine_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_categories to fetch.
     */
    orderBy?: wine_categoriesOrderByWithRelationInput | wine_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: wine_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned wine_categories
    **/
    _count?: true | Wine_categoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Wine_categoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Wine_categoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Wine_categoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Wine_categoriesMaxAggregateInputType
  }

  export type GetWine_categoriesAggregateType<T extends Wine_categoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateWine_categories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWine_categories[P]>
      : GetScalarType<T[P], AggregateWine_categories[P]>
  }




  export type wine_categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: wine_categoriesWhereInput
    orderBy?: wine_categoriesOrderByWithAggregationInput | wine_categoriesOrderByWithAggregationInput[]
    by: Wine_categoriesScalarFieldEnum[] | Wine_categoriesScalarFieldEnum
    having?: wine_categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Wine_categoriesCountAggregateInputType | true
    _avg?: Wine_categoriesAvgAggregateInputType
    _sum?: Wine_categoriesSumAggregateInputType
    _min?: Wine_categoriesMinAggregateInputType
    _max?: Wine_categoriesMaxAggregateInputType
  }

  export type Wine_categoriesGroupByOutputType = {
    id: number
    code: string
    _count: Wine_categoriesCountAggregateOutputType | null
    _avg: Wine_categoriesAvgAggregateOutputType | null
    _sum: Wine_categoriesSumAggregateOutputType | null
    _min: Wine_categoriesMinAggregateOutputType | null
    _max: Wine_categoriesMaxAggregateOutputType | null
  }

  type GetWine_categoriesGroupByPayload<T extends wine_categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Wine_categoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Wine_categoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Wine_categoriesGroupByOutputType[P]>
            : GetScalarType<T[P], Wine_categoriesGroupByOutputType[P]>
        }
      >
    >


  export type wine_categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    tastings?: boolean | wine_categories$tastingsArgs<ExtArgs>
    wine_category_translations?: boolean | wine_categories$wine_category_translationsArgs<ExtArgs>
    _count?: boolean | Wine_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wine_categories"]>

  export type wine_categoriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
  }, ExtArgs["result"]["wine_categories"]>

  export type wine_categoriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
  }, ExtArgs["result"]["wine_categories"]>

  export type wine_categoriesSelectScalar = {
    id?: boolean
    code?: boolean
  }

  export type wine_categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code", ExtArgs["result"]["wine_categories"]>
  export type wine_categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tastings?: boolean | wine_categories$tastingsArgs<ExtArgs>
    wine_category_translations?: boolean | wine_categories$wine_category_translationsArgs<ExtArgs>
    _count?: boolean | Wine_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type wine_categoriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type wine_categoriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $wine_categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "wine_categories"
    objects: {
      tastings: Prisma.$tastingsPayload<ExtArgs>[]
      wine_category_translations: Prisma.$wine_category_translationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
    }, ExtArgs["result"]["wine_categories"]>
    composites: {}
  }

  type wine_categoriesGetPayload<S extends boolean | null | undefined | wine_categoriesDefaultArgs> = $Result.GetResult<Prisma.$wine_categoriesPayload, S>

  type wine_categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<wine_categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Wine_categoriesCountAggregateInputType | true
    }

  export interface wine_categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['wine_categories'], meta: { name: 'wine_categories' } }
    /**
     * Find zero or one Wine_categories that matches the filter.
     * @param {wine_categoriesFindUniqueArgs} args - Arguments to find a Wine_categories
     * @example
     * // Get one Wine_categories
     * const wine_categories = await prisma.wine_categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends wine_categoriesFindUniqueArgs>(args: SelectSubset<T, wine_categoriesFindUniqueArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wine_categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {wine_categoriesFindUniqueOrThrowArgs} args - Arguments to find a Wine_categories
     * @example
     * // Get one Wine_categories
     * const wine_categories = await prisma.wine_categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends wine_categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, wine_categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wine_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_categoriesFindFirstArgs} args - Arguments to find a Wine_categories
     * @example
     * // Get one Wine_categories
     * const wine_categories = await prisma.wine_categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends wine_categoriesFindFirstArgs>(args?: SelectSubset<T, wine_categoriesFindFirstArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wine_categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_categoriesFindFirstOrThrowArgs} args - Arguments to find a Wine_categories
     * @example
     * // Get one Wine_categories
     * const wine_categories = await prisma.wine_categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends wine_categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, wine_categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wine_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wine_categories
     * const wine_categories = await prisma.wine_categories.findMany()
     * 
     * // Get first 10 Wine_categories
     * const wine_categories = await prisma.wine_categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wine_categoriesWithIdOnly = await prisma.wine_categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends wine_categoriesFindManyArgs>(args?: SelectSubset<T, wine_categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wine_categories.
     * @param {wine_categoriesCreateArgs} args - Arguments to create a Wine_categories.
     * @example
     * // Create one Wine_categories
     * const Wine_categories = await prisma.wine_categories.create({
     *   data: {
     *     // ... data to create a Wine_categories
     *   }
     * })
     * 
     */
    create<T extends wine_categoriesCreateArgs>(args: SelectSubset<T, wine_categoriesCreateArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wine_categories.
     * @param {wine_categoriesCreateManyArgs} args - Arguments to create many Wine_categories.
     * @example
     * // Create many Wine_categories
     * const wine_categories = await prisma.wine_categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends wine_categoriesCreateManyArgs>(args?: SelectSubset<T, wine_categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wine_categories and returns the data saved in the database.
     * @param {wine_categoriesCreateManyAndReturnArgs} args - Arguments to create many Wine_categories.
     * @example
     * // Create many Wine_categories
     * const wine_categories = await prisma.wine_categories.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wine_categories and only return the `id`
     * const wine_categoriesWithIdOnly = await prisma.wine_categories.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends wine_categoriesCreateManyAndReturnArgs>(args?: SelectSubset<T, wine_categoriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wine_categories.
     * @param {wine_categoriesDeleteArgs} args - Arguments to delete one Wine_categories.
     * @example
     * // Delete one Wine_categories
     * const Wine_categories = await prisma.wine_categories.delete({
     *   where: {
     *     // ... filter to delete one Wine_categories
     *   }
     * })
     * 
     */
    delete<T extends wine_categoriesDeleteArgs>(args: SelectSubset<T, wine_categoriesDeleteArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wine_categories.
     * @param {wine_categoriesUpdateArgs} args - Arguments to update one Wine_categories.
     * @example
     * // Update one Wine_categories
     * const wine_categories = await prisma.wine_categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends wine_categoriesUpdateArgs>(args: SelectSubset<T, wine_categoriesUpdateArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wine_categories.
     * @param {wine_categoriesDeleteManyArgs} args - Arguments to filter Wine_categories to delete.
     * @example
     * // Delete a few Wine_categories
     * const { count } = await prisma.wine_categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends wine_categoriesDeleteManyArgs>(args?: SelectSubset<T, wine_categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wine_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wine_categories
     * const wine_categories = await prisma.wine_categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends wine_categoriesUpdateManyArgs>(args: SelectSubset<T, wine_categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wine_categories and returns the data updated in the database.
     * @param {wine_categoriesUpdateManyAndReturnArgs} args - Arguments to update many Wine_categories.
     * @example
     * // Update many Wine_categories
     * const wine_categories = await prisma.wine_categories.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wine_categories and only return the `id`
     * const wine_categoriesWithIdOnly = await prisma.wine_categories.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends wine_categoriesUpdateManyAndReturnArgs>(args: SelectSubset<T, wine_categoriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wine_categories.
     * @param {wine_categoriesUpsertArgs} args - Arguments to update or create a Wine_categories.
     * @example
     * // Update or create a Wine_categories
     * const wine_categories = await prisma.wine_categories.upsert({
     *   create: {
     *     // ... data to create a Wine_categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wine_categories we want to update
     *   }
     * })
     */
    upsert<T extends wine_categoriesUpsertArgs>(args: SelectSubset<T, wine_categoriesUpsertArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wine_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_categoriesCountArgs} args - Arguments to filter Wine_categories to count.
     * @example
     * // Count the number of Wine_categories
     * const count = await prisma.wine_categories.count({
     *   where: {
     *     // ... the filter for the Wine_categories we want to count
     *   }
     * })
    **/
    count<T extends wine_categoriesCountArgs>(
      args?: Subset<T, wine_categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Wine_categoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wine_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Wine_categoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Wine_categoriesAggregateArgs>(args: Subset<T, Wine_categoriesAggregateArgs>): Prisma.PrismaPromise<GetWine_categoriesAggregateType<T>>

    /**
     * Group by Wine_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends wine_categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: wine_categoriesGroupByArgs['orderBy'] }
        : { orderBy?: wine_categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, wine_categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWine_categoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the wine_categories model
   */
  readonly fields: wine_categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for wine_categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__wine_categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tastings<T extends wine_categories$tastingsArgs<ExtArgs> = {}>(args?: Subset<T, wine_categories$tastingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wine_category_translations<T extends wine_categories$wine_category_translationsArgs<ExtArgs> = {}>(args?: Subset<T, wine_categories$wine_category_translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the wine_categories model
   */
  interface wine_categoriesFieldRefs {
    readonly id: FieldRef<"wine_categories", 'Int'>
    readonly code: FieldRef<"wine_categories", 'String'>
  }
    

  // Custom InputTypes
  /**
   * wine_categories findUnique
   */
  export type wine_categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which wine_categories to fetch.
     */
    where: wine_categoriesWhereUniqueInput
  }

  /**
   * wine_categories findUniqueOrThrow
   */
  export type wine_categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which wine_categories to fetch.
     */
    where: wine_categoriesWhereUniqueInput
  }

  /**
   * wine_categories findFirst
   */
  export type wine_categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which wine_categories to fetch.
     */
    where?: wine_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_categories to fetch.
     */
    orderBy?: wine_categoriesOrderByWithRelationInput | wine_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wine_categories.
     */
    cursor?: wine_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wine_categories.
     */
    distinct?: Wine_categoriesScalarFieldEnum | Wine_categoriesScalarFieldEnum[]
  }

  /**
   * wine_categories findFirstOrThrow
   */
  export type wine_categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which wine_categories to fetch.
     */
    where?: wine_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_categories to fetch.
     */
    orderBy?: wine_categoriesOrderByWithRelationInput | wine_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wine_categories.
     */
    cursor?: wine_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wine_categories.
     */
    distinct?: Wine_categoriesScalarFieldEnum | Wine_categoriesScalarFieldEnum[]
  }

  /**
   * wine_categories findMany
   */
  export type wine_categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which wine_categories to fetch.
     */
    where?: wine_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_categories to fetch.
     */
    orderBy?: wine_categoriesOrderByWithRelationInput | wine_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing wine_categories.
     */
    cursor?: wine_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_categories.
     */
    skip?: number
    distinct?: Wine_categoriesScalarFieldEnum | Wine_categoriesScalarFieldEnum[]
  }

  /**
   * wine_categories create
   */
  export type wine_categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a wine_categories.
     */
    data: XOR<wine_categoriesCreateInput, wine_categoriesUncheckedCreateInput>
  }

  /**
   * wine_categories createMany
   */
  export type wine_categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many wine_categories.
     */
    data: wine_categoriesCreateManyInput | wine_categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * wine_categories createManyAndReturn
   */
  export type wine_categoriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * The data used to create many wine_categories.
     */
    data: wine_categoriesCreateManyInput | wine_categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * wine_categories update
   */
  export type wine_categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a wine_categories.
     */
    data: XOR<wine_categoriesUpdateInput, wine_categoriesUncheckedUpdateInput>
    /**
     * Choose, which wine_categories to update.
     */
    where: wine_categoriesWhereUniqueInput
  }

  /**
   * wine_categories updateMany
   */
  export type wine_categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update wine_categories.
     */
    data: XOR<wine_categoriesUpdateManyMutationInput, wine_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which wine_categories to update
     */
    where?: wine_categoriesWhereInput
    /**
     * Limit how many wine_categories to update.
     */
    limit?: number
  }

  /**
   * wine_categories updateManyAndReturn
   */
  export type wine_categoriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * The data used to update wine_categories.
     */
    data: XOR<wine_categoriesUpdateManyMutationInput, wine_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which wine_categories to update
     */
    where?: wine_categoriesWhereInput
    /**
     * Limit how many wine_categories to update.
     */
    limit?: number
  }

  /**
   * wine_categories upsert
   */
  export type wine_categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the wine_categories to update in case it exists.
     */
    where: wine_categoriesWhereUniqueInput
    /**
     * In case the wine_categories found by the `where` argument doesn't exist, create a new wine_categories with this data.
     */
    create: XOR<wine_categoriesCreateInput, wine_categoriesUncheckedCreateInput>
    /**
     * In case the wine_categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<wine_categoriesUpdateInput, wine_categoriesUncheckedUpdateInput>
  }

  /**
   * wine_categories delete
   */
  export type wine_categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    /**
     * Filter which wine_categories to delete.
     */
    where: wine_categoriesWhereUniqueInput
  }

  /**
   * wine_categories deleteMany
   */
  export type wine_categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wine_categories to delete
     */
    where?: wine_categoriesWhereInput
    /**
     * Limit how many wine_categories to delete.
     */
    limit?: number
  }

  /**
   * wine_categories.tastings
   */
  export type wine_categories$tastingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    where?: tastingsWhereInput
    orderBy?: tastingsOrderByWithRelationInput | tastingsOrderByWithRelationInput[]
    cursor?: tastingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TastingsScalarFieldEnum | TastingsScalarFieldEnum[]
  }

  /**
   * wine_categories.wine_category_translations
   */
  export type wine_categories$wine_category_translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    where?: wine_category_translationsWhereInput
    orderBy?: wine_category_translationsOrderByWithRelationInput | wine_category_translationsOrderByWithRelationInput[]
    cursor?: wine_category_translationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Wine_category_translationsScalarFieldEnum | Wine_category_translationsScalarFieldEnum[]
  }

  /**
   * wine_categories without action
   */
  export type wine_categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
  }


  /**
   * Model wine_category_translations
   */

  export type AggregateWine_category_translations = {
    _count: Wine_category_translationsCountAggregateOutputType | null
    _avg: Wine_category_translationsAvgAggregateOutputType | null
    _sum: Wine_category_translationsSumAggregateOutputType | null
    _min: Wine_category_translationsMinAggregateOutputType | null
    _max: Wine_category_translationsMaxAggregateOutputType | null
  }

  export type Wine_category_translationsAvgAggregateOutputType = {
    id: number | null
    category_id: number | null
  }

  export type Wine_category_translationsSumAggregateOutputType = {
    id: number | null
    category_id: number | null
  }

  export type Wine_category_translationsMinAggregateOutputType = {
    id: number | null
    category_id: number | null
    language_code: string | null
    name: string | null
  }

  export type Wine_category_translationsMaxAggregateOutputType = {
    id: number | null
    category_id: number | null
    language_code: string | null
    name: string | null
  }

  export type Wine_category_translationsCountAggregateOutputType = {
    id: number
    category_id: number
    language_code: number
    name: number
    _all: number
  }


  export type Wine_category_translationsAvgAggregateInputType = {
    id?: true
    category_id?: true
  }

  export type Wine_category_translationsSumAggregateInputType = {
    id?: true
    category_id?: true
  }

  export type Wine_category_translationsMinAggregateInputType = {
    id?: true
    category_id?: true
    language_code?: true
    name?: true
  }

  export type Wine_category_translationsMaxAggregateInputType = {
    id?: true
    category_id?: true
    language_code?: true
    name?: true
  }

  export type Wine_category_translationsCountAggregateInputType = {
    id?: true
    category_id?: true
    language_code?: true
    name?: true
    _all?: true
  }

  export type Wine_category_translationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wine_category_translations to aggregate.
     */
    where?: wine_category_translationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_category_translations to fetch.
     */
    orderBy?: wine_category_translationsOrderByWithRelationInput | wine_category_translationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: wine_category_translationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_category_translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_category_translations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned wine_category_translations
    **/
    _count?: true | Wine_category_translationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Wine_category_translationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Wine_category_translationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Wine_category_translationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Wine_category_translationsMaxAggregateInputType
  }

  export type GetWine_category_translationsAggregateType<T extends Wine_category_translationsAggregateArgs> = {
        [P in keyof T & keyof AggregateWine_category_translations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWine_category_translations[P]>
      : GetScalarType<T[P], AggregateWine_category_translations[P]>
  }




  export type wine_category_translationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: wine_category_translationsWhereInput
    orderBy?: wine_category_translationsOrderByWithAggregationInput | wine_category_translationsOrderByWithAggregationInput[]
    by: Wine_category_translationsScalarFieldEnum[] | Wine_category_translationsScalarFieldEnum
    having?: wine_category_translationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Wine_category_translationsCountAggregateInputType | true
    _avg?: Wine_category_translationsAvgAggregateInputType
    _sum?: Wine_category_translationsSumAggregateInputType
    _min?: Wine_category_translationsMinAggregateInputType
    _max?: Wine_category_translationsMaxAggregateInputType
  }

  export type Wine_category_translationsGroupByOutputType = {
    id: number
    category_id: number | null
    language_code: string
    name: string
    _count: Wine_category_translationsCountAggregateOutputType | null
    _avg: Wine_category_translationsAvgAggregateOutputType | null
    _sum: Wine_category_translationsSumAggregateOutputType | null
    _min: Wine_category_translationsMinAggregateOutputType | null
    _max: Wine_category_translationsMaxAggregateOutputType | null
  }

  type GetWine_category_translationsGroupByPayload<T extends wine_category_translationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Wine_category_translationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Wine_category_translationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Wine_category_translationsGroupByOutputType[P]>
            : GetScalarType<T[P], Wine_category_translationsGroupByOutputType[P]>
        }
      >
    >


  export type wine_category_translationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_id?: boolean
    language_code?: boolean
    name?: boolean
    wine_categories?: boolean | wine_category_translations$wine_categoriesArgs<ExtArgs>
  }, ExtArgs["result"]["wine_category_translations"]>

  export type wine_category_translationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_id?: boolean
    language_code?: boolean
    name?: boolean
    wine_categories?: boolean | wine_category_translations$wine_categoriesArgs<ExtArgs>
  }, ExtArgs["result"]["wine_category_translations"]>

  export type wine_category_translationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_id?: boolean
    language_code?: boolean
    name?: boolean
    wine_categories?: boolean | wine_category_translations$wine_categoriesArgs<ExtArgs>
  }, ExtArgs["result"]["wine_category_translations"]>

  export type wine_category_translationsSelectScalar = {
    id?: boolean
    category_id?: boolean
    language_code?: boolean
    name?: boolean
  }

  export type wine_category_translationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category_id" | "language_code" | "name", ExtArgs["result"]["wine_category_translations"]>
  export type wine_category_translationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wine_categories?: boolean | wine_category_translations$wine_categoriesArgs<ExtArgs>
  }
  export type wine_category_translationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wine_categories?: boolean | wine_category_translations$wine_categoriesArgs<ExtArgs>
  }
  export type wine_category_translationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wine_categories?: boolean | wine_category_translations$wine_categoriesArgs<ExtArgs>
  }

  export type $wine_category_translationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "wine_category_translations"
    objects: {
      wine_categories: Prisma.$wine_categoriesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      category_id: number | null
      language_code: string
      name: string
    }, ExtArgs["result"]["wine_category_translations"]>
    composites: {}
  }

  type wine_category_translationsGetPayload<S extends boolean | null | undefined | wine_category_translationsDefaultArgs> = $Result.GetResult<Prisma.$wine_category_translationsPayload, S>

  type wine_category_translationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<wine_category_translationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Wine_category_translationsCountAggregateInputType | true
    }

  export interface wine_category_translationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['wine_category_translations'], meta: { name: 'wine_category_translations' } }
    /**
     * Find zero or one Wine_category_translations that matches the filter.
     * @param {wine_category_translationsFindUniqueArgs} args - Arguments to find a Wine_category_translations
     * @example
     * // Get one Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends wine_category_translationsFindUniqueArgs>(args: SelectSubset<T, wine_category_translationsFindUniqueArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wine_category_translations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {wine_category_translationsFindUniqueOrThrowArgs} args - Arguments to find a Wine_category_translations
     * @example
     * // Get one Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends wine_category_translationsFindUniqueOrThrowArgs>(args: SelectSubset<T, wine_category_translationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wine_category_translations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_category_translationsFindFirstArgs} args - Arguments to find a Wine_category_translations
     * @example
     * // Get one Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends wine_category_translationsFindFirstArgs>(args?: SelectSubset<T, wine_category_translationsFindFirstArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wine_category_translations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_category_translationsFindFirstOrThrowArgs} args - Arguments to find a Wine_category_translations
     * @example
     * // Get one Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends wine_category_translationsFindFirstOrThrowArgs>(args?: SelectSubset<T, wine_category_translationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wine_category_translations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_category_translationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.findMany()
     * 
     * // Get first 10 Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wine_category_translationsWithIdOnly = await prisma.wine_category_translations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends wine_category_translationsFindManyArgs>(args?: SelectSubset<T, wine_category_translationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wine_category_translations.
     * @param {wine_category_translationsCreateArgs} args - Arguments to create a Wine_category_translations.
     * @example
     * // Create one Wine_category_translations
     * const Wine_category_translations = await prisma.wine_category_translations.create({
     *   data: {
     *     // ... data to create a Wine_category_translations
     *   }
     * })
     * 
     */
    create<T extends wine_category_translationsCreateArgs>(args: SelectSubset<T, wine_category_translationsCreateArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wine_category_translations.
     * @param {wine_category_translationsCreateManyArgs} args - Arguments to create many Wine_category_translations.
     * @example
     * // Create many Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends wine_category_translationsCreateManyArgs>(args?: SelectSubset<T, wine_category_translationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wine_category_translations and returns the data saved in the database.
     * @param {wine_category_translationsCreateManyAndReturnArgs} args - Arguments to create many Wine_category_translations.
     * @example
     * // Create many Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wine_category_translations and only return the `id`
     * const wine_category_translationsWithIdOnly = await prisma.wine_category_translations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends wine_category_translationsCreateManyAndReturnArgs>(args?: SelectSubset<T, wine_category_translationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wine_category_translations.
     * @param {wine_category_translationsDeleteArgs} args - Arguments to delete one Wine_category_translations.
     * @example
     * // Delete one Wine_category_translations
     * const Wine_category_translations = await prisma.wine_category_translations.delete({
     *   where: {
     *     // ... filter to delete one Wine_category_translations
     *   }
     * })
     * 
     */
    delete<T extends wine_category_translationsDeleteArgs>(args: SelectSubset<T, wine_category_translationsDeleteArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wine_category_translations.
     * @param {wine_category_translationsUpdateArgs} args - Arguments to update one Wine_category_translations.
     * @example
     * // Update one Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends wine_category_translationsUpdateArgs>(args: SelectSubset<T, wine_category_translationsUpdateArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wine_category_translations.
     * @param {wine_category_translationsDeleteManyArgs} args - Arguments to filter Wine_category_translations to delete.
     * @example
     * // Delete a few Wine_category_translations
     * const { count } = await prisma.wine_category_translations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends wine_category_translationsDeleteManyArgs>(args?: SelectSubset<T, wine_category_translationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wine_category_translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_category_translationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends wine_category_translationsUpdateManyArgs>(args: SelectSubset<T, wine_category_translationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wine_category_translations and returns the data updated in the database.
     * @param {wine_category_translationsUpdateManyAndReturnArgs} args - Arguments to update many Wine_category_translations.
     * @example
     * // Update many Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wine_category_translations and only return the `id`
     * const wine_category_translationsWithIdOnly = await prisma.wine_category_translations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends wine_category_translationsUpdateManyAndReturnArgs>(args: SelectSubset<T, wine_category_translationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wine_category_translations.
     * @param {wine_category_translationsUpsertArgs} args - Arguments to update or create a Wine_category_translations.
     * @example
     * // Update or create a Wine_category_translations
     * const wine_category_translations = await prisma.wine_category_translations.upsert({
     *   create: {
     *     // ... data to create a Wine_category_translations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wine_category_translations we want to update
     *   }
     * })
     */
    upsert<T extends wine_category_translationsUpsertArgs>(args: SelectSubset<T, wine_category_translationsUpsertArgs<ExtArgs>>): Prisma__wine_category_translationsClient<$Result.GetResult<Prisma.$wine_category_translationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wine_category_translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_category_translationsCountArgs} args - Arguments to filter Wine_category_translations to count.
     * @example
     * // Count the number of Wine_category_translations
     * const count = await prisma.wine_category_translations.count({
     *   where: {
     *     // ... the filter for the Wine_category_translations we want to count
     *   }
     * })
    **/
    count<T extends wine_category_translationsCountArgs>(
      args?: Subset<T, wine_category_translationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Wine_category_translationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wine_category_translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Wine_category_translationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Wine_category_translationsAggregateArgs>(args: Subset<T, Wine_category_translationsAggregateArgs>): Prisma.PrismaPromise<GetWine_category_translationsAggregateType<T>>

    /**
     * Group by Wine_category_translations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {wine_category_translationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends wine_category_translationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: wine_category_translationsGroupByArgs['orderBy'] }
        : { orderBy?: wine_category_translationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, wine_category_translationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWine_category_translationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the wine_category_translations model
   */
  readonly fields: wine_category_translationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for wine_category_translations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__wine_category_translationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wine_categories<T extends wine_category_translations$wine_categoriesArgs<ExtArgs> = {}>(args?: Subset<T, wine_category_translations$wine_categoriesArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the wine_category_translations model
   */
  interface wine_category_translationsFieldRefs {
    readonly id: FieldRef<"wine_category_translations", 'Int'>
    readonly category_id: FieldRef<"wine_category_translations", 'Int'>
    readonly language_code: FieldRef<"wine_category_translations", 'String'>
    readonly name: FieldRef<"wine_category_translations", 'String'>
  }
    

  // Custom InputTypes
  /**
   * wine_category_translations findUnique
   */
  export type wine_category_translationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * Filter, which wine_category_translations to fetch.
     */
    where: wine_category_translationsWhereUniqueInput
  }

  /**
   * wine_category_translations findUniqueOrThrow
   */
  export type wine_category_translationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * Filter, which wine_category_translations to fetch.
     */
    where: wine_category_translationsWhereUniqueInput
  }

  /**
   * wine_category_translations findFirst
   */
  export type wine_category_translationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * Filter, which wine_category_translations to fetch.
     */
    where?: wine_category_translationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_category_translations to fetch.
     */
    orderBy?: wine_category_translationsOrderByWithRelationInput | wine_category_translationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wine_category_translations.
     */
    cursor?: wine_category_translationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_category_translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_category_translations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wine_category_translations.
     */
    distinct?: Wine_category_translationsScalarFieldEnum | Wine_category_translationsScalarFieldEnum[]
  }

  /**
   * wine_category_translations findFirstOrThrow
   */
  export type wine_category_translationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * Filter, which wine_category_translations to fetch.
     */
    where?: wine_category_translationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_category_translations to fetch.
     */
    orderBy?: wine_category_translationsOrderByWithRelationInput | wine_category_translationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wine_category_translations.
     */
    cursor?: wine_category_translationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_category_translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_category_translations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wine_category_translations.
     */
    distinct?: Wine_category_translationsScalarFieldEnum | Wine_category_translationsScalarFieldEnum[]
  }

  /**
   * wine_category_translations findMany
   */
  export type wine_category_translationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * Filter, which wine_category_translations to fetch.
     */
    where?: wine_category_translationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wine_category_translations to fetch.
     */
    orderBy?: wine_category_translationsOrderByWithRelationInput | wine_category_translationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing wine_category_translations.
     */
    cursor?: wine_category_translationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wine_category_translations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wine_category_translations.
     */
    skip?: number
    distinct?: Wine_category_translationsScalarFieldEnum | Wine_category_translationsScalarFieldEnum[]
  }

  /**
   * wine_category_translations create
   */
  export type wine_category_translationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * The data needed to create a wine_category_translations.
     */
    data: XOR<wine_category_translationsCreateInput, wine_category_translationsUncheckedCreateInput>
  }

  /**
   * wine_category_translations createMany
   */
  export type wine_category_translationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many wine_category_translations.
     */
    data: wine_category_translationsCreateManyInput | wine_category_translationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * wine_category_translations createManyAndReturn
   */
  export type wine_category_translationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * The data used to create many wine_category_translations.
     */
    data: wine_category_translationsCreateManyInput | wine_category_translationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * wine_category_translations update
   */
  export type wine_category_translationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * The data needed to update a wine_category_translations.
     */
    data: XOR<wine_category_translationsUpdateInput, wine_category_translationsUncheckedUpdateInput>
    /**
     * Choose, which wine_category_translations to update.
     */
    where: wine_category_translationsWhereUniqueInput
  }

  /**
   * wine_category_translations updateMany
   */
  export type wine_category_translationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update wine_category_translations.
     */
    data: XOR<wine_category_translationsUpdateManyMutationInput, wine_category_translationsUncheckedUpdateManyInput>
    /**
     * Filter which wine_category_translations to update
     */
    where?: wine_category_translationsWhereInput
    /**
     * Limit how many wine_category_translations to update.
     */
    limit?: number
  }

  /**
   * wine_category_translations updateManyAndReturn
   */
  export type wine_category_translationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * The data used to update wine_category_translations.
     */
    data: XOR<wine_category_translationsUpdateManyMutationInput, wine_category_translationsUncheckedUpdateManyInput>
    /**
     * Filter which wine_category_translations to update
     */
    where?: wine_category_translationsWhereInput
    /**
     * Limit how many wine_category_translations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * wine_category_translations upsert
   */
  export type wine_category_translationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * The filter to search for the wine_category_translations to update in case it exists.
     */
    where: wine_category_translationsWhereUniqueInput
    /**
     * In case the wine_category_translations found by the `where` argument doesn't exist, create a new wine_category_translations with this data.
     */
    create: XOR<wine_category_translationsCreateInput, wine_category_translationsUncheckedCreateInput>
    /**
     * In case the wine_category_translations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<wine_category_translationsUpdateInput, wine_category_translationsUncheckedUpdateInput>
  }

  /**
   * wine_category_translations delete
   */
  export type wine_category_translationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
    /**
     * Filter which wine_category_translations to delete.
     */
    where: wine_category_translationsWhereUniqueInput
  }

  /**
   * wine_category_translations deleteMany
   */
  export type wine_category_translationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wine_category_translations to delete
     */
    where?: wine_category_translationsWhereInput
    /**
     * Limit how many wine_category_translations to delete.
     */
    limit?: number
  }

  /**
   * wine_category_translations.wine_categories
   */
  export type wine_category_translations$wine_categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_categories
     */
    select?: wine_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_categories
     */
    omit?: wine_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_categoriesInclude<ExtArgs> | null
    where?: wine_categoriesWhereInput
  }

  /**
   * wine_category_translations without action
   */
  export type wine_category_translationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wine_category_translations
     */
    select?: wine_category_translationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wine_category_translations
     */
    omit?: wine_category_translationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: wine_category_translationsInclude<ExtArgs> | null
  }


  /**
   * Model tastings
   */

  export type AggregateTastings = {
    _count: TastingsCountAggregateOutputType | null
    _avg: TastingsAvgAggregateOutputType | null
    _sum: TastingsSumAggregateOutputType | null
    _min: TastingsMinAggregateOutputType | null
    _max: TastingsMaxAggregateOutputType | null
  }

  export type TastingsAvgAggregateOutputType = {
    id: number | null
    wine_category_id: number | null
    alcohol_content: Decimal | null
    vintage: number | null
    wine_temperature: Decimal | null
    ambient_temperature: Decimal | null
  }

  export type TastingsSumAggregateOutputType = {
    id: number | null
    wine_category_id: number | null
    alcohol_content: Decimal | null
    vintage: number | null
    wine_temperature: Decimal | null
    ambient_temperature: Decimal | null
  }

  export type TastingsMinAggregateOutputType = {
    id: number | null
    tid: string | null
    uid: string | null
    full_name: string | null
    wine_category_id: number | null
    wine_denomination: string | null
    alcohol_content: Decimal | null
    vintage: number | null
    wine_temperature: Decimal | null
    ambient_temperature: Decimal | null
    tasting_date: Date | null
    tasting_time: Date | null
    tasting_location: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TastingsMaxAggregateOutputType = {
    id: number | null
    tid: string | null
    uid: string | null
    full_name: string | null
    wine_category_id: number | null
    wine_denomination: string | null
    alcohol_content: Decimal | null
    vintage: number | null
    wine_temperature: Decimal | null
    ambient_temperature: Decimal | null
    tasting_date: Date | null
    tasting_time: Date | null
    tasting_location: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TastingsCountAggregateOutputType = {
    id: number
    tid: number
    uid: number
    full_name: number
    wine_category_id: number
    wine_denomination: number
    alcohol_content: number
    vintage: number
    wine_temperature: number
    ambient_temperature: number
    tasting_date: number
    tasting_time: number
    tasting_location: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TastingsAvgAggregateInputType = {
    id?: true
    wine_category_id?: true
    alcohol_content?: true
    vintage?: true
    wine_temperature?: true
    ambient_temperature?: true
  }

  export type TastingsSumAggregateInputType = {
    id?: true
    wine_category_id?: true
    alcohol_content?: true
    vintage?: true
    wine_temperature?: true
    ambient_temperature?: true
  }

  export type TastingsMinAggregateInputType = {
    id?: true
    tid?: true
    uid?: true
    full_name?: true
    wine_category_id?: true
    wine_denomination?: true
    alcohol_content?: true
    vintage?: true
    wine_temperature?: true
    ambient_temperature?: true
    tasting_date?: true
    tasting_time?: true
    tasting_location?: true
    created_at?: true
    updated_at?: true
  }

  export type TastingsMaxAggregateInputType = {
    id?: true
    tid?: true
    uid?: true
    full_name?: true
    wine_category_id?: true
    wine_denomination?: true
    alcohol_content?: true
    vintage?: true
    wine_temperature?: true
    ambient_temperature?: true
    tasting_date?: true
    tasting_time?: true
    tasting_location?: true
    created_at?: true
    updated_at?: true
  }

  export type TastingsCountAggregateInputType = {
    id?: true
    tid?: true
    uid?: true
    full_name?: true
    wine_category_id?: true
    wine_denomination?: true
    alcohol_content?: true
    vintage?: true
    wine_temperature?: true
    ambient_temperature?: true
    tasting_date?: true
    tasting_time?: true
    tasting_location?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TastingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tastings to aggregate.
     */
    where?: tastingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tastings to fetch.
     */
    orderBy?: tastingsOrderByWithRelationInput | tastingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tastingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tastings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tastings
    **/
    _count?: true | TastingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TastingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TastingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TastingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TastingsMaxAggregateInputType
  }

  export type GetTastingsAggregateType<T extends TastingsAggregateArgs> = {
        [P in keyof T & keyof AggregateTastings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTastings[P]>
      : GetScalarType<T[P], AggregateTastings[P]>
  }




  export type tastingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tastingsWhereInput
    orderBy?: tastingsOrderByWithAggregationInput | tastingsOrderByWithAggregationInput[]
    by: TastingsScalarFieldEnum[] | TastingsScalarFieldEnum
    having?: tastingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TastingsCountAggregateInputType | true
    _avg?: TastingsAvgAggregateInputType
    _sum?: TastingsSumAggregateInputType
    _min?: TastingsMinAggregateInputType
    _max?: TastingsMaxAggregateInputType
  }

  export type TastingsGroupByOutputType = {
    id: number
    tid: string
    uid: string
    full_name: string | null
    wine_category_id: number
    wine_denomination: string
    alcohol_content: Decimal
    vintage: number
    wine_temperature: Decimal
    ambient_temperature: Decimal
    tasting_date: Date
    tasting_time: Date
    tasting_location: string
    created_at: Date | null
    updated_at: Date | null
    _count: TastingsCountAggregateOutputType | null
    _avg: TastingsAvgAggregateOutputType | null
    _sum: TastingsSumAggregateOutputType | null
    _min: TastingsMinAggregateOutputType | null
    _max: TastingsMaxAggregateOutputType | null
  }

  type GetTastingsGroupByPayload<T extends tastingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TastingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TastingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TastingsGroupByOutputType[P]>
            : GetScalarType<T[P], TastingsGroupByOutputType[P]>
        }
      >
    >


  export type tastingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tid?: boolean
    uid?: boolean
    full_name?: boolean
    wine_category_id?: boolean
    wine_denomination?: boolean
    alcohol_content?: boolean
    vintage?: boolean
    wine_temperature?: boolean
    ambient_temperature?: boolean
    tasting_date?: boolean
    tasting_time?: boolean
    tasting_location?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    wine_categories?: boolean | wine_categoriesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tastings"]>

  export type tastingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tid?: boolean
    uid?: boolean
    full_name?: boolean
    wine_category_id?: boolean
    wine_denomination?: boolean
    alcohol_content?: boolean
    vintage?: boolean
    wine_temperature?: boolean
    ambient_temperature?: boolean
    tasting_date?: boolean
    tasting_time?: boolean
    tasting_location?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    wine_categories?: boolean | wine_categoriesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tastings"]>

  export type tastingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tid?: boolean
    uid?: boolean
    full_name?: boolean
    wine_category_id?: boolean
    wine_denomination?: boolean
    alcohol_content?: boolean
    vintage?: boolean
    wine_temperature?: boolean
    ambient_temperature?: boolean
    tasting_date?: boolean
    tasting_time?: boolean
    tasting_location?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    wine_categories?: boolean | wine_categoriesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tastings"]>

  export type tastingsSelectScalar = {
    id?: boolean
    tid?: boolean
    uid?: boolean
    full_name?: boolean
    wine_category_id?: boolean
    wine_denomination?: boolean
    alcohol_content?: boolean
    vintage?: boolean
    wine_temperature?: boolean
    ambient_temperature?: boolean
    tasting_date?: boolean
    tasting_time?: boolean
    tasting_location?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type tastingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tid" | "uid" | "full_name" | "wine_category_id" | "wine_denomination" | "alcohol_content" | "vintage" | "wine_temperature" | "ambient_temperature" | "tasting_date" | "tasting_time" | "tasting_location" | "created_at" | "updated_at", ExtArgs["result"]["tastings"]>
  export type tastingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    wine_categories?: boolean | wine_categoriesDefaultArgs<ExtArgs>
  }
  export type tastingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    wine_categories?: boolean | wine_categoriesDefaultArgs<ExtArgs>
  }
  export type tastingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    wine_categories?: boolean | wine_categoriesDefaultArgs<ExtArgs>
  }

  export type $tastingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tastings"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      wine_categories: Prisma.$wine_categoriesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tid: string
      uid: string
      full_name: string | null
      wine_category_id: number
      wine_denomination: string
      alcohol_content: Prisma.Decimal
      vintage: number
      wine_temperature: Prisma.Decimal
      ambient_temperature: Prisma.Decimal
      tasting_date: Date
      tasting_time: Date
      tasting_location: string
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["tastings"]>
    composites: {}
  }

  type tastingsGetPayload<S extends boolean | null | undefined | tastingsDefaultArgs> = $Result.GetResult<Prisma.$tastingsPayload, S>

  type tastingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tastingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TastingsCountAggregateInputType | true
    }

  export interface tastingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tastings'], meta: { name: 'tastings' } }
    /**
     * Find zero or one Tastings that matches the filter.
     * @param {tastingsFindUniqueArgs} args - Arguments to find a Tastings
     * @example
     * // Get one Tastings
     * const tastings = await prisma.tastings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tastingsFindUniqueArgs>(args: SelectSubset<T, tastingsFindUniqueArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tastings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tastingsFindUniqueOrThrowArgs} args - Arguments to find a Tastings
     * @example
     * // Get one Tastings
     * const tastings = await prisma.tastings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tastingsFindUniqueOrThrowArgs>(args: SelectSubset<T, tastingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tastings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tastingsFindFirstArgs} args - Arguments to find a Tastings
     * @example
     * // Get one Tastings
     * const tastings = await prisma.tastings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tastingsFindFirstArgs>(args?: SelectSubset<T, tastingsFindFirstArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tastings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tastingsFindFirstOrThrowArgs} args - Arguments to find a Tastings
     * @example
     * // Get one Tastings
     * const tastings = await prisma.tastings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tastingsFindFirstOrThrowArgs>(args?: SelectSubset<T, tastingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tastings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tastingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tastings
     * const tastings = await prisma.tastings.findMany()
     * 
     * // Get first 10 Tastings
     * const tastings = await prisma.tastings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tastingsWithIdOnly = await prisma.tastings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tastingsFindManyArgs>(args?: SelectSubset<T, tastingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tastings.
     * @param {tastingsCreateArgs} args - Arguments to create a Tastings.
     * @example
     * // Create one Tastings
     * const Tastings = await prisma.tastings.create({
     *   data: {
     *     // ... data to create a Tastings
     *   }
     * })
     * 
     */
    create<T extends tastingsCreateArgs>(args: SelectSubset<T, tastingsCreateArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tastings.
     * @param {tastingsCreateManyArgs} args - Arguments to create many Tastings.
     * @example
     * // Create many Tastings
     * const tastings = await prisma.tastings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tastingsCreateManyArgs>(args?: SelectSubset<T, tastingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tastings and returns the data saved in the database.
     * @param {tastingsCreateManyAndReturnArgs} args - Arguments to create many Tastings.
     * @example
     * // Create many Tastings
     * const tastings = await prisma.tastings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tastings and only return the `id`
     * const tastingsWithIdOnly = await prisma.tastings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tastingsCreateManyAndReturnArgs>(args?: SelectSubset<T, tastingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tastings.
     * @param {tastingsDeleteArgs} args - Arguments to delete one Tastings.
     * @example
     * // Delete one Tastings
     * const Tastings = await prisma.tastings.delete({
     *   where: {
     *     // ... filter to delete one Tastings
     *   }
     * })
     * 
     */
    delete<T extends tastingsDeleteArgs>(args: SelectSubset<T, tastingsDeleteArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tastings.
     * @param {tastingsUpdateArgs} args - Arguments to update one Tastings.
     * @example
     * // Update one Tastings
     * const tastings = await prisma.tastings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tastingsUpdateArgs>(args: SelectSubset<T, tastingsUpdateArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tastings.
     * @param {tastingsDeleteManyArgs} args - Arguments to filter Tastings to delete.
     * @example
     * // Delete a few Tastings
     * const { count } = await prisma.tastings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tastingsDeleteManyArgs>(args?: SelectSubset<T, tastingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tastings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tastingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tastings
     * const tastings = await prisma.tastings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tastingsUpdateManyArgs>(args: SelectSubset<T, tastingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tastings and returns the data updated in the database.
     * @param {tastingsUpdateManyAndReturnArgs} args - Arguments to update many Tastings.
     * @example
     * // Update many Tastings
     * const tastings = await prisma.tastings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tastings and only return the `id`
     * const tastingsWithIdOnly = await prisma.tastings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tastingsUpdateManyAndReturnArgs>(args: SelectSubset<T, tastingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tastings.
     * @param {tastingsUpsertArgs} args - Arguments to update or create a Tastings.
     * @example
     * // Update or create a Tastings
     * const tastings = await prisma.tastings.upsert({
     *   create: {
     *     // ... data to create a Tastings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tastings we want to update
     *   }
     * })
     */
    upsert<T extends tastingsUpsertArgs>(args: SelectSubset<T, tastingsUpsertArgs<ExtArgs>>): Prisma__tastingsClient<$Result.GetResult<Prisma.$tastingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tastings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tastingsCountArgs} args - Arguments to filter Tastings to count.
     * @example
     * // Count the number of Tastings
     * const count = await prisma.tastings.count({
     *   where: {
     *     // ... the filter for the Tastings we want to count
     *   }
     * })
    **/
    count<T extends tastingsCountArgs>(
      args?: Subset<T, tastingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TastingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tastings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TastingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TastingsAggregateArgs>(args: Subset<T, TastingsAggregateArgs>): Prisma.PrismaPromise<GetTastingsAggregateType<T>>

    /**
     * Group by Tastings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tastingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tastingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tastingsGroupByArgs['orderBy'] }
        : { orderBy?: tastingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tastingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTastingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tastings model
   */
  readonly fields: tastingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tastings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tastingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    wine_categories<T extends wine_categoriesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, wine_categoriesDefaultArgs<ExtArgs>>): Prisma__wine_categoriesClient<$Result.GetResult<Prisma.$wine_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tastings model
   */
  interface tastingsFieldRefs {
    readonly id: FieldRef<"tastings", 'Int'>
    readonly tid: FieldRef<"tastings", 'String'>
    readonly uid: FieldRef<"tastings", 'String'>
    readonly full_name: FieldRef<"tastings", 'String'>
    readonly wine_category_id: FieldRef<"tastings", 'Int'>
    readonly wine_denomination: FieldRef<"tastings", 'String'>
    readonly alcohol_content: FieldRef<"tastings", 'Decimal'>
    readonly vintage: FieldRef<"tastings", 'Int'>
    readonly wine_temperature: FieldRef<"tastings", 'Decimal'>
    readonly ambient_temperature: FieldRef<"tastings", 'Decimal'>
    readonly tasting_date: FieldRef<"tastings", 'DateTime'>
    readonly tasting_time: FieldRef<"tastings", 'DateTime'>
    readonly tasting_location: FieldRef<"tastings", 'String'>
    readonly created_at: FieldRef<"tastings", 'DateTime'>
    readonly updated_at: FieldRef<"tastings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tastings findUnique
   */
  export type tastingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * Filter, which tastings to fetch.
     */
    where: tastingsWhereUniqueInput
  }

  /**
   * tastings findUniqueOrThrow
   */
  export type tastingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * Filter, which tastings to fetch.
     */
    where: tastingsWhereUniqueInput
  }

  /**
   * tastings findFirst
   */
  export type tastingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * Filter, which tastings to fetch.
     */
    where?: tastingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tastings to fetch.
     */
    orderBy?: tastingsOrderByWithRelationInput | tastingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tastings.
     */
    cursor?: tastingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tastings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tastings.
     */
    distinct?: TastingsScalarFieldEnum | TastingsScalarFieldEnum[]
  }

  /**
   * tastings findFirstOrThrow
   */
  export type tastingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * Filter, which tastings to fetch.
     */
    where?: tastingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tastings to fetch.
     */
    orderBy?: tastingsOrderByWithRelationInput | tastingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tastings.
     */
    cursor?: tastingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tastings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tastings.
     */
    distinct?: TastingsScalarFieldEnum | TastingsScalarFieldEnum[]
  }

  /**
   * tastings findMany
   */
  export type tastingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * Filter, which tastings to fetch.
     */
    where?: tastingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tastings to fetch.
     */
    orderBy?: tastingsOrderByWithRelationInput | tastingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tastings.
     */
    cursor?: tastingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tastings.
     */
    skip?: number
    distinct?: TastingsScalarFieldEnum | TastingsScalarFieldEnum[]
  }

  /**
   * tastings create
   */
  export type tastingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * The data needed to create a tastings.
     */
    data: XOR<tastingsCreateInput, tastingsUncheckedCreateInput>
  }

  /**
   * tastings createMany
   */
  export type tastingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tastings.
     */
    data: tastingsCreateManyInput | tastingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tastings createManyAndReturn
   */
  export type tastingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * The data used to create many tastings.
     */
    data: tastingsCreateManyInput | tastingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tastings update
   */
  export type tastingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * The data needed to update a tastings.
     */
    data: XOR<tastingsUpdateInput, tastingsUncheckedUpdateInput>
    /**
     * Choose, which tastings to update.
     */
    where: tastingsWhereUniqueInput
  }

  /**
   * tastings updateMany
   */
  export type tastingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tastings.
     */
    data: XOR<tastingsUpdateManyMutationInput, tastingsUncheckedUpdateManyInput>
    /**
     * Filter which tastings to update
     */
    where?: tastingsWhereInput
    /**
     * Limit how many tastings to update.
     */
    limit?: number
  }

  /**
   * tastings updateManyAndReturn
   */
  export type tastingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * The data used to update tastings.
     */
    data: XOR<tastingsUpdateManyMutationInput, tastingsUncheckedUpdateManyInput>
    /**
     * Filter which tastings to update
     */
    where?: tastingsWhereInput
    /**
     * Limit how many tastings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tastings upsert
   */
  export type tastingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * The filter to search for the tastings to update in case it exists.
     */
    where: tastingsWhereUniqueInput
    /**
     * In case the tastings found by the `where` argument doesn't exist, create a new tastings with this data.
     */
    create: XOR<tastingsCreateInput, tastingsUncheckedCreateInput>
    /**
     * In case the tastings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tastingsUpdateInput, tastingsUncheckedUpdateInput>
  }

  /**
   * tastings delete
   */
  export type tastingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
    /**
     * Filter which tastings to delete.
     */
    where: tastingsWhereUniqueInput
  }

  /**
   * tastings deleteMany
   */
  export type tastingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tastings to delete
     */
    where?: tastingsWhereInput
    /**
     * Limit how many tastings to delete.
     */
    limit?: number
  }

  /**
   * tastings without action
   */
  export type tastingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tastings
     */
    select?: tastingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tastings
     */
    omit?: tastingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tastingsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    username: 'username',
    full_name: 'full_name',
    birthdate: 'birthdate',
    email: 'email',
    password_hash: 'password_hash',
    admin: 'admin',
    premium: 'premium',
    google_id: 'google_id',
    facebook_id: 'facebook_id',
    apple_id: 'apple_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Wine_categoriesScalarFieldEnum: {
    id: 'id',
    code: 'code'
  };

  export type Wine_categoriesScalarFieldEnum = (typeof Wine_categoriesScalarFieldEnum)[keyof typeof Wine_categoriesScalarFieldEnum]


  export const Wine_category_translationsScalarFieldEnum: {
    id: 'id',
    category_id: 'category_id',
    language_code: 'language_code',
    name: 'name'
  };

  export type Wine_category_translationsScalarFieldEnum = (typeof Wine_category_translationsScalarFieldEnum)[keyof typeof Wine_category_translationsScalarFieldEnum]


  export const TastingsScalarFieldEnum: {
    id: 'id',
    tid: 'tid',
    uid: 'uid',
    full_name: 'full_name',
    wine_category_id: 'wine_category_id',
    wine_denomination: 'wine_denomination',
    alcohol_content: 'alcohol_content',
    vintage: 'vintage',
    wine_temperature: 'wine_temperature',
    ambient_temperature: 'ambient_temperature',
    tasting_date: 'tasting_date',
    tasting_time: 'tasting_time',
    tasting_location: 'tasting_location',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TastingsScalarFieldEnum = (typeof TastingsScalarFieldEnum)[keyof typeof TastingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    uid?: UuidFilter<"users"> | string
    username?: StringNullableFilter<"users"> | string | null
    full_name?: StringNullableFilter<"users"> | string | null
    birthdate?: DateTimeNullableFilter<"users"> | Date | string | null
    email?: StringNullableFilter<"users"> | string | null
    password_hash?: StringNullableFilter<"users"> | string | null
    admin?: BoolNullableFilter<"users"> | boolean | null
    premium?: BoolNullableFilter<"users"> | boolean | null
    google_id?: StringNullableFilter<"users"> | string | null
    facebook_id?: StringNullableFilter<"users"> | string | null
    apple_id?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    tastings?: TastingsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    uid?: SortOrder
    username?: SortOrderInput | SortOrder
    full_name?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password_hash?: SortOrderInput | SortOrder
    admin?: SortOrderInput | SortOrder
    premium?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    facebook_id?: SortOrderInput | SortOrder
    apple_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    tastings?: tastingsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uid?: string
    username?: string
    email?: string
    google_id?: string
    facebook_id?: string
    apple_id?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    full_name?: StringNullableFilter<"users"> | string | null
    birthdate?: DateTimeNullableFilter<"users"> | Date | string | null
    password_hash?: StringNullableFilter<"users"> | string | null
    admin?: BoolNullableFilter<"users"> | boolean | null
    premium?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    tastings?: TastingsListRelationFilter
  }, "id" | "uid" | "username" | "email" | "google_id" | "facebook_id" | "apple_id">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    uid?: SortOrder
    username?: SortOrderInput | SortOrder
    full_name?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password_hash?: SortOrderInput | SortOrder
    admin?: SortOrderInput | SortOrder
    premium?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    facebook_id?: SortOrderInput | SortOrder
    apple_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    uid?: UuidWithAggregatesFilter<"users"> | string
    username?: StringNullableWithAggregatesFilter<"users"> | string | null
    full_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    birthdate?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    email?: StringNullableWithAggregatesFilter<"users"> | string | null
    password_hash?: StringNullableWithAggregatesFilter<"users"> | string | null
    admin?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    premium?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    google_id?: StringNullableWithAggregatesFilter<"users"> | string | null
    facebook_id?: StringNullableWithAggregatesFilter<"users"> | string | null
    apple_id?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type wine_categoriesWhereInput = {
    AND?: wine_categoriesWhereInput | wine_categoriesWhereInput[]
    OR?: wine_categoriesWhereInput[]
    NOT?: wine_categoriesWhereInput | wine_categoriesWhereInput[]
    id?: IntFilter<"wine_categories"> | number
    code?: StringFilter<"wine_categories"> | string
    tastings?: TastingsListRelationFilter
    wine_category_translations?: Wine_category_translationsListRelationFilter
  }

  export type wine_categoriesOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    tastings?: tastingsOrderByRelationAggregateInput
    wine_category_translations?: wine_category_translationsOrderByRelationAggregateInput
  }

  export type wine_categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: wine_categoriesWhereInput | wine_categoriesWhereInput[]
    OR?: wine_categoriesWhereInput[]
    NOT?: wine_categoriesWhereInput | wine_categoriesWhereInput[]
    tastings?: TastingsListRelationFilter
    wine_category_translations?: Wine_category_translationsListRelationFilter
  }, "id" | "code">

  export type wine_categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    _count?: wine_categoriesCountOrderByAggregateInput
    _avg?: wine_categoriesAvgOrderByAggregateInput
    _max?: wine_categoriesMaxOrderByAggregateInput
    _min?: wine_categoriesMinOrderByAggregateInput
    _sum?: wine_categoriesSumOrderByAggregateInput
  }

  export type wine_categoriesScalarWhereWithAggregatesInput = {
    AND?: wine_categoriesScalarWhereWithAggregatesInput | wine_categoriesScalarWhereWithAggregatesInput[]
    OR?: wine_categoriesScalarWhereWithAggregatesInput[]
    NOT?: wine_categoriesScalarWhereWithAggregatesInput | wine_categoriesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"wine_categories"> | number
    code?: StringWithAggregatesFilter<"wine_categories"> | string
  }

  export type wine_category_translationsWhereInput = {
    AND?: wine_category_translationsWhereInput | wine_category_translationsWhereInput[]
    OR?: wine_category_translationsWhereInput[]
    NOT?: wine_category_translationsWhereInput | wine_category_translationsWhereInput[]
    id?: IntFilter<"wine_category_translations"> | number
    category_id?: IntNullableFilter<"wine_category_translations"> | number | null
    language_code?: StringFilter<"wine_category_translations"> | string
    name?: StringFilter<"wine_category_translations"> | string
    wine_categories?: XOR<Wine_categoriesNullableScalarRelationFilter, wine_categoriesWhereInput> | null
  }

  export type wine_category_translationsOrderByWithRelationInput = {
    id?: SortOrder
    category_id?: SortOrderInput | SortOrder
    language_code?: SortOrder
    name?: SortOrder
    wine_categories?: wine_categoriesOrderByWithRelationInput
  }

  export type wine_category_translationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    category_id_language_code?: wine_category_translationsCategory_idLanguage_codeCompoundUniqueInput
    AND?: wine_category_translationsWhereInput | wine_category_translationsWhereInput[]
    OR?: wine_category_translationsWhereInput[]
    NOT?: wine_category_translationsWhereInput | wine_category_translationsWhereInput[]
    category_id?: IntNullableFilter<"wine_category_translations"> | number | null
    language_code?: StringFilter<"wine_category_translations"> | string
    name?: StringFilter<"wine_category_translations"> | string
    wine_categories?: XOR<Wine_categoriesNullableScalarRelationFilter, wine_categoriesWhereInput> | null
  }, "id" | "category_id_language_code">

  export type wine_category_translationsOrderByWithAggregationInput = {
    id?: SortOrder
    category_id?: SortOrderInput | SortOrder
    language_code?: SortOrder
    name?: SortOrder
    _count?: wine_category_translationsCountOrderByAggregateInput
    _avg?: wine_category_translationsAvgOrderByAggregateInput
    _max?: wine_category_translationsMaxOrderByAggregateInput
    _min?: wine_category_translationsMinOrderByAggregateInput
    _sum?: wine_category_translationsSumOrderByAggregateInput
  }

  export type wine_category_translationsScalarWhereWithAggregatesInput = {
    AND?: wine_category_translationsScalarWhereWithAggregatesInput | wine_category_translationsScalarWhereWithAggregatesInput[]
    OR?: wine_category_translationsScalarWhereWithAggregatesInput[]
    NOT?: wine_category_translationsScalarWhereWithAggregatesInput | wine_category_translationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"wine_category_translations"> | number
    category_id?: IntNullableWithAggregatesFilter<"wine_category_translations"> | number | null
    language_code?: StringWithAggregatesFilter<"wine_category_translations"> | string
    name?: StringWithAggregatesFilter<"wine_category_translations"> | string
  }

  export type tastingsWhereInput = {
    AND?: tastingsWhereInput | tastingsWhereInput[]
    OR?: tastingsWhereInput[]
    NOT?: tastingsWhereInput | tastingsWhereInput[]
    id?: IntFilter<"tastings"> | number
    tid?: UuidFilter<"tastings"> | string
    uid?: UuidFilter<"tastings"> | string
    full_name?: StringNullableFilter<"tastings"> | string | null
    wine_category_id?: IntFilter<"tastings"> | number
    wine_denomination?: StringFilter<"tastings"> | string
    alcohol_content?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    vintage?: IntFilter<"tastings"> | number
    wine_temperature?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFilter<"tastings"> | Date | string
    tasting_time?: DateTimeFilter<"tastings"> | Date | string
    tasting_location?: StringFilter<"tastings"> | string
    created_at?: DateTimeNullableFilter<"tastings"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"tastings"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    wine_categories?: XOR<Wine_categoriesScalarRelationFilter, wine_categoriesWhereInput>
  }

  export type tastingsOrderByWithRelationInput = {
    id?: SortOrder
    tid?: SortOrder
    uid?: SortOrder
    full_name?: SortOrderInput | SortOrder
    wine_category_id?: SortOrder
    wine_denomination?: SortOrder
    alcohol_content?: SortOrder
    vintage?: SortOrder
    wine_temperature?: SortOrder
    ambient_temperature?: SortOrder
    tasting_date?: SortOrder
    tasting_time?: SortOrder
    tasting_location?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    wine_categories?: wine_categoriesOrderByWithRelationInput
  }

  export type tastingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    tid?: string
    AND?: tastingsWhereInput | tastingsWhereInput[]
    OR?: tastingsWhereInput[]
    NOT?: tastingsWhereInput | tastingsWhereInput[]
    uid?: UuidFilter<"tastings"> | string
    full_name?: StringNullableFilter<"tastings"> | string | null
    wine_category_id?: IntFilter<"tastings"> | number
    wine_denomination?: StringFilter<"tastings"> | string
    alcohol_content?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    vintage?: IntFilter<"tastings"> | number
    wine_temperature?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFilter<"tastings"> | Date | string
    tasting_time?: DateTimeFilter<"tastings"> | Date | string
    tasting_location?: StringFilter<"tastings"> | string
    created_at?: DateTimeNullableFilter<"tastings"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"tastings"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    wine_categories?: XOR<Wine_categoriesScalarRelationFilter, wine_categoriesWhereInput>
  }, "id" | "tid">

  export type tastingsOrderByWithAggregationInput = {
    id?: SortOrder
    tid?: SortOrder
    uid?: SortOrder
    full_name?: SortOrderInput | SortOrder
    wine_category_id?: SortOrder
    wine_denomination?: SortOrder
    alcohol_content?: SortOrder
    vintage?: SortOrder
    wine_temperature?: SortOrder
    ambient_temperature?: SortOrder
    tasting_date?: SortOrder
    tasting_time?: SortOrder
    tasting_location?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: tastingsCountOrderByAggregateInput
    _avg?: tastingsAvgOrderByAggregateInput
    _max?: tastingsMaxOrderByAggregateInput
    _min?: tastingsMinOrderByAggregateInput
    _sum?: tastingsSumOrderByAggregateInput
  }

  export type tastingsScalarWhereWithAggregatesInput = {
    AND?: tastingsScalarWhereWithAggregatesInput | tastingsScalarWhereWithAggregatesInput[]
    OR?: tastingsScalarWhereWithAggregatesInput[]
    NOT?: tastingsScalarWhereWithAggregatesInput | tastingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"tastings"> | number
    tid?: UuidWithAggregatesFilter<"tastings"> | string
    uid?: UuidWithAggregatesFilter<"tastings"> | string
    full_name?: StringNullableWithAggregatesFilter<"tastings"> | string | null
    wine_category_id?: IntWithAggregatesFilter<"tastings"> | number
    wine_denomination?: StringWithAggregatesFilter<"tastings"> | string
    alcohol_content?: DecimalWithAggregatesFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    vintage?: IntWithAggregatesFilter<"tastings"> | number
    wine_temperature?: DecimalWithAggregatesFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalWithAggregatesFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeWithAggregatesFilter<"tastings"> | Date | string
    tasting_time?: DateTimeWithAggregatesFilter<"tastings"> | Date | string
    tasting_location?: StringWithAggregatesFilter<"tastings"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"tastings"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"tastings"> | Date | string | null
  }

  export type usersCreateInput = {
    uid?: string
    username?: string | null
    full_name?: string | null
    birthdate?: Date | string | null
    email?: string | null
    password_hash?: string | null
    admin?: boolean | null
    premium?: boolean | null
    google_id?: string | null
    facebook_id?: string | null
    apple_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    tastings?: tastingsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    uid?: string
    username?: string | null
    full_name?: string | null
    birthdate?: Date | string | null
    email?: string | null
    password_hash?: string | null
    admin?: boolean | null
    premium?: boolean | null
    google_id?: string | null
    facebook_id?: string | null
    apple_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    tastings?: tastingsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    premium?: NullableBoolFieldUpdateOperationsInput | boolean | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tastings?: tastingsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    premium?: NullableBoolFieldUpdateOperationsInput | boolean | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tastings?: tastingsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    uid?: string
    username?: string | null
    full_name?: string | null
    birthdate?: Date | string | null
    email?: string | null
    password_hash?: string | null
    admin?: boolean | null
    premium?: boolean | null
    google_id?: string | null
    facebook_id?: string | null
    apple_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    premium?: NullableBoolFieldUpdateOperationsInput | boolean | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    premium?: NullableBoolFieldUpdateOperationsInput | boolean | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type wine_categoriesCreateInput = {
    code: string
    tastings?: tastingsCreateNestedManyWithoutWine_categoriesInput
    wine_category_translations?: wine_category_translationsCreateNestedManyWithoutWine_categoriesInput
  }

  export type wine_categoriesUncheckedCreateInput = {
    id?: number
    code: string
    tastings?: tastingsUncheckedCreateNestedManyWithoutWine_categoriesInput
    wine_category_translations?: wine_category_translationsUncheckedCreateNestedManyWithoutWine_categoriesInput
  }

  export type wine_categoriesUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    tastings?: tastingsUpdateManyWithoutWine_categoriesNestedInput
    wine_category_translations?: wine_category_translationsUpdateManyWithoutWine_categoriesNestedInput
  }

  export type wine_categoriesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    tastings?: tastingsUncheckedUpdateManyWithoutWine_categoriesNestedInput
    wine_category_translations?: wine_category_translationsUncheckedUpdateManyWithoutWine_categoriesNestedInput
  }

  export type wine_categoriesCreateManyInput = {
    id?: number
    code: string
  }

  export type wine_categoriesUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
  }

  export type wine_categoriesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
  }

  export type wine_category_translationsCreateInput = {
    language_code: string
    name: string
    wine_categories?: wine_categoriesCreateNestedOneWithoutWine_category_translationsInput
  }

  export type wine_category_translationsUncheckedCreateInput = {
    id?: number
    category_id?: number | null
    language_code: string
    name: string
  }

  export type wine_category_translationsUpdateInput = {
    language_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wine_categories?: wine_categoriesUpdateOneWithoutWine_category_translationsNestedInput
  }

  export type wine_category_translationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    language_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type wine_category_translationsCreateManyInput = {
    id?: number
    category_id?: number | null
    language_code: string
    name: string
  }

  export type wine_category_translationsUpdateManyMutationInput = {
    language_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type wine_category_translationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    language_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type tastingsCreateInput = {
    tid?: string
    full_name?: string | null
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    users: usersCreateNestedOneWithoutTastingsInput
    wine_categories: wine_categoriesCreateNestedOneWithoutTastingsInput
  }

  export type tastingsUncheckedCreateInput = {
    id?: number
    tid?: string
    uid: string
    full_name?: string | null
    wine_category_id: number
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type tastingsUpdateInput = {
    tid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutTastingsNestedInput
    wine_categories?: wine_categoriesUpdateOneRequiredWithoutTastingsNestedInput
  }

  export type tastingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tid?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_category_id?: IntFieldUpdateOperationsInput | number
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tastingsCreateManyInput = {
    id?: number
    tid?: string
    uid: string
    full_name?: string | null
    wine_category_id: number
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type tastingsUpdateManyMutationInput = {
    tid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tastingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tid?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_category_id?: IntFieldUpdateOperationsInput | number
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type TastingsListRelationFilter = {
    every?: tastingsWhereInput
    some?: tastingsWhereInput
    none?: tastingsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type tastingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    username?: SortOrder
    full_name?: SortOrder
    birthdate?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    admin?: SortOrder
    premium?: SortOrder
    google_id?: SortOrder
    facebook_id?: SortOrder
    apple_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    username?: SortOrder
    full_name?: SortOrder
    birthdate?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    admin?: SortOrder
    premium?: SortOrder
    google_id?: SortOrder
    facebook_id?: SortOrder
    apple_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    username?: SortOrder
    full_name?: SortOrder
    birthdate?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    admin?: SortOrder
    premium?: SortOrder
    google_id?: SortOrder
    facebook_id?: SortOrder
    apple_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Wine_category_translationsListRelationFilter = {
    every?: wine_category_translationsWhereInput
    some?: wine_category_translationsWhereInput
    none?: wine_category_translationsWhereInput
  }

  export type wine_category_translationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type wine_categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
  }

  export type wine_categoriesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type wine_categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
  }

  export type wine_categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
  }

  export type wine_categoriesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Wine_categoriesNullableScalarRelationFilter = {
    is?: wine_categoriesWhereInput | null
    isNot?: wine_categoriesWhereInput | null
  }

  export type wine_category_translationsCategory_idLanguage_codeCompoundUniqueInput = {
    category_id: number
    language_code: string
  }

  export type wine_category_translationsCountOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    language_code?: SortOrder
    name?: SortOrder
  }

  export type wine_category_translationsAvgOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
  }

  export type wine_category_translationsMaxOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    language_code?: SortOrder
    name?: SortOrder
  }

  export type wine_category_translationsMinOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    language_code?: SortOrder
    name?: SortOrder
  }

  export type wine_category_translationsSumOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type Wine_categoriesScalarRelationFilter = {
    is?: wine_categoriesWhereInput
    isNot?: wine_categoriesWhereInput
  }

  export type tastingsCountOrderByAggregateInput = {
    id?: SortOrder
    tid?: SortOrder
    uid?: SortOrder
    full_name?: SortOrder
    wine_category_id?: SortOrder
    wine_denomination?: SortOrder
    alcohol_content?: SortOrder
    vintage?: SortOrder
    wine_temperature?: SortOrder
    ambient_temperature?: SortOrder
    tasting_date?: SortOrder
    tasting_time?: SortOrder
    tasting_location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type tastingsAvgOrderByAggregateInput = {
    id?: SortOrder
    wine_category_id?: SortOrder
    alcohol_content?: SortOrder
    vintage?: SortOrder
    wine_temperature?: SortOrder
    ambient_temperature?: SortOrder
  }

  export type tastingsMaxOrderByAggregateInput = {
    id?: SortOrder
    tid?: SortOrder
    uid?: SortOrder
    full_name?: SortOrder
    wine_category_id?: SortOrder
    wine_denomination?: SortOrder
    alcohol_content?: SortOrder
    vintage?: SortOrder
    wine_temperature?: SortOrder
    ambient_temperature?: SortOrder
    tasting_date?: SortOrder
    tasting_time?: SortOrder
    tasting_location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type tastingsMinOrderByAggregateInput = {
    id?: SortOrder
    tid?: SortOrder
    uid?: SortOrder
    full_name?: SortOrder
    wine_category_id?: SortOrder
    wine_denomination?: SortOrder
    alcohol_content?: SortOrder
    vintage?: SortOrder
    wine_temperature?: SortOrder
    ambient_temperature?: SortOrder
    tasting_date?: SortOrder
    tasting_time?: SortOrder
    tasting_location?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type tastingsSumOrderByAggregateInput = {
    id?: SortOrder
    wine_category_id?: SortOrder
    alcohol_content?: SortOrder
    vintage?: SortOrder
    wine_temperature?: SortOrder
    ambient_temperature?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type tastingsCreateNestedManyWithoutUsersInput = {
    create?: XOR<tastingsCreateWithoutUsersInput, tastingsUncheckedCreateWithoutUsersInput> | tastingsCreateWithoutUsersInput[] | tastingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutUsersInput | tastingsCreateOrConnectWithoutUsersInput[]
    createMany?: tastingsCreateManyUsersInputEnvelope
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
  }

  export type tastingsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<tastingsCreateWithoutUsersInput, tastingsUncheckedCreateWithoutUsersInput> | tastingsCreateWithoutUsersInput[] | tastingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutUsersInput | tastingsCreateOrConnectWithoutUsersInput[]
    createMany?: tastingsCreateManyUsersInputEnvelope
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type tastingsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<tastingsCreateWithoutUsersInput, tastingsUncheckedCreateWithoutUsersInput> | tastingsCreateWithoutUsersInput[] | tastingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutUsersInput | tastingsCreateOrConnectWithoutUsersInput[]
    upsert?: tastingsUpsertWithWhereUniqueWithoutUsersInput | tastingsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: tastingsCreateManyUsersInputEnvelope
    set?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    disconnect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    delete?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    update?: tastingsUpdateWithWhereUniqueWithoutUsersInput | tastingsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: tastingsUpdateManyWithWhereWithoutUsersInput | tastingsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: tastingsScalarWhereInput | tastingsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type tastingsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<tastingsCreateWithoutUsersInput, tastingsUncheckedCreateWithoutUsersInput> | tastingsCreateWithoutUsersInput[] | tastingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutUsersInput | tastingsCreateOrConnectWithoutUsersInput[]
    upsert?: tastingsUpsertWithWhereUniqueWithoutUsersInput | tastingsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: tastingsCreateManyUsersInputEnvelope
    set?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    disconnect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    delete?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    update?: tastingsUpdateWithWhereUniqueWithoutUsersInput | tastingsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: tastingsUpdateManyWithWhereWithoutUsersInput | tastingsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: tastingsScalarWhereInput | tastingsScalarWhereInput[]
  }

  export type tastingsCreateNestedManyWithoutWine_categoriesInput = {
    create?: XOR<tastingsCreateWithoutWine_categoriesInput, tastingsUncheckedCreateWithoutWine_categoriesInput> | tastingsCreateWithoutWine_categoriesInput[] | tastingsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutWine_categoriesInput | tastingsCreateOrConnectWithoutWine_categoriesInput[]
    createMany?: tastingsCreateManyWine_categoriesInputEnvelope
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
  }

  export type wine_category_translationsCreateNestedManyWithoutWine_categoriesInput = {
    create?: XOR<wine_category_translationsCreateWithoutWine_categoriesInput, wine_category_translationsUncheckedCreateWithoutWine_categoriesInput> | wine_category_translationsCreateWithoutWine_categoriesInput[] | wine_category_translationsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: wine_category_translationsCreateOrConnectWithoutWine_categoriesInput | wine_category_translationsCreateOrConnectWithoutWine_categoriesInput[]
    createMany?: wine_category_translationsCreateManyWine_categoriesInputEnvelope
    connect?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
  }

  export type tastingsUncheckedCreateNestedManyWithoutWine_categoriesInput = {
    create?: XOR<tastingsCreateWithoutWine_categoriesInput, tastingsUncheckedCreateWithoutWine_categoriesInput> | tastingsCreateWithoutWine_categoriesInput[] | tastingsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutWine_categoriesInput | tastingsCreateOrConnectWithoutWine_categoriesInput[]
    createMany?: tastingsCreateManyWine_categoriesInputEnvelope
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
  }

  export type wine_category_translationsUncheckedCreateNestedManyWithoutWine_categoriesInput = {
    create?: XOR<wine_category_translationsCreateWithoutWine_categoriesInput, wine_category_translationsUncheckedCreateWithoutWine_categoriesInput> | wine_category_translationsCreateWithoutWine_categoriesInput[] | wine_category_translationsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: wine_category_translationsCreateOrConnectWithoutWine_categoriesInput | wine_category_translationsCreateOrConnectWithoutWine_categoriesInput[]
    createMany?: wine_category_translationsCreateManyWine_categoriesInputEnvelope
    connect?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
  }

  export type tastingsUpdateManyWithoutWine_categoriesNestedInput = {
    create?: XOR<tastingsCreateWithoutWine_categoriesInput, tastingsUncheckedCreateWithoutWine_categoriesInput> | tastingsCreateWithoutWine_categoriesInput[] | tastingsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutWine_categoriesInput | tastingsCreateOrConnectWithoutWine_categoriesInput[]
    upsert?: tastingsUpsertWithWhereUniqueWithoutWine_categoriesInput | tastingsUpsertWithWhereUniqueWithoutWine_categoriesInput[]
    createMany?: tastingsCreateManyWine_categoriesInputEnvelope
    set?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    disconnect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    delete?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    update?: tastingsUpdateWithWhereUniqueWithoutWine_categoriesInput | tastingsUpdateWithWhereUniqueWithoutWine_categoriesInput[]
    updateMany?: tastingsUpdateManyWithWhereWithoutWine_categoriesInput | tastingsUpdateManyWithWhereWithoutWine_categoriesInput[]
    deleteMany?: tastingsScalarWhereInput | tastingsScalarWhereInput[]
  }

  export type wine_category_translationsUpdateManyWithoutWine_categoriesNestedInput = {
    create?: XOR<wine_category_translationsCreateWithoutWine_categoriesInput, wine_category_translationsUncheckedCreateWithoutWine_categoriesInput> | wine_category_translationsCreateWithoutWine_categoriesInput[] | wine_category_translationsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: wine_category_translationsCreateOrConnectWithoutWine_categoriesInput | wine_category_translationsCreateOrConnectWithoutWine_categoriesInput[]
    upsert?: wine_category_translationsUpsertWithWhereUniqueWithoutWine_categoriesInput | wine_category_translationsUpsertWithWhereUniqueWithoutWine_categoriesInput[]
    createMany?: wine_category_translationsCreateManyWine_categoriesInputEnvelope
    set?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    disconnect?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    delete?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    connect?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    update?: wine_category_translationsUpdateWithWhereUniqueWithoutWine_categoriesInput | wine_category_translationsUpdateWithWhereUniqueWithoutWine_categoriesInput[]
    updateMany?: wine_category_translationsUpdateManyWithWhereWithoutWine_categoriesInput | wine_category_translationsUpdateManyWithWhereWithoutWine_categoriesInput[]
    deleteMany?: wine_category_translationsScalarWhereInput | wine_category_translationsScalarWhereInput[]
  }

  export type tastingsUncheckedUpdateManyWithoutWine_categoriesNestedInput = {
    create?: XOR<tastingsCreateWithoutWine_categoriesInput, tastingsUncheckedCreateWithoutWine_categoriesInput> | tastingsCreateWithoutWine_categoriesInput[] | tastingsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: tastingsCreateOrConnectWithoutWine_categoriesInput | tastingsCreateOrConnectWithoutWine_categoriesInput[]
    upsert?: tastingsUpsertWithWhereUniqueWithoutWine_categoriesInput | tastingsUpsertWithWhereUniqueWithoutWine_categoriesInput[]
    createMany?: tastingsCreateManyWine_categoriesInputEnvelope
    set?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    disconnect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    delete?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    connect?: tastingsWhereUniqueInput | tastingsWhereUniqueInput[]
    update?: tastingsUpdateWithWhereUniqueWithoutWine_categoriesInput | tastingsUpdateWithWhereUniqueWithoutWine_categoriesInput[]
    updateMany?: tastingsUpdateManyWithWhereWithoutWine_categoriesInput | tastingsUpdateManyWithWhereWithoutWine_categoriesInput[]
    deleteMany?: tastingsScalarWhereInput | tastingsScalarWhereInput[]
  }

  export type wine_category_translationsUncheckedUpdateManyWithoutWine_categoriesNestedInput = {
    create?: XOR<wine_category_translationsCreateWithoutWine_categoriesInput, wine_category_translationsUncheckedCreateWithoutWine_categoriesInput> | wine_category_translationsCreateWithoutWine_categoriesInput[] | wine_category_translationsUncheckedCreateWithoutWine_categoriesInput[]
    connectOrCreate?: wine_category_translationsCreateOrConnectWithoutWine_categoriesInput | wine_category_translationsCreateOrConnectWithoutWine_categoriesInput[]
    upsert?: wine_category_translationsUpsertWithWhereUniqueWithoutWine_categoriesInput | wine_category_translationsUpsertWithWhereUniqueWithoutWine_categoriesInput[]
    createMany?: wine_category_translationsCreateManyWine_categoriesInputEnvelope
    set?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    disconnect?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    delete?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    connect?: wine_category_translationsWhereUniqueInput | wine_category_translationsWhereUniqueInput[]
    update?: wine_category_translationsUpdateWithWhereUniqueWithoutWine_categoriesInput | wine_category_translationsUpdateWithWhereUniqueWithoutWine_categoriesInput[]
    updateMany?: wine_category_translationsUpdateManyWithWhereWithoutWine_categoriesInput | wine_category_translationsUpdateManyWithWhereWithoutWine_categoriesInput[]
    deleteMany?: wine_category_translationsScalarWhereInput | wine_category_translationsScalarWhereInput[]
  }

  export type wine_categoriesCreateNestedOneWithoutWine_category_translationsInput = {
    create?: XOR<wine_categoriesCreateWithoutWine_category_translationsInput, wine_categoriesUncheckedCreateWithoutWine_category_translationsInput>
    connectOrCreate?: wine_categoriesCreateOrConnectWithoutWine_category_translationsInput
    connect?: wine_categoriesWhereUniqueInput
  }

  export type wine_categoriesUpdateOneWithoutWine_category_translationsNestedInput = {
    create?: XOR<wine_categoriesCreateWithoutWine_category_translationsInput, wine_categoriesUncheckedCreateWithoutWine_category_translationsInput>
    connectOrCreate?: wine_categoriesCreateOrConnectWithoutWine_category_translationsInput
    upsert?: wine_categoriesUpsertWithoutWine_category_translationsInput
    disconnect?: wine_categoriesWhereInput | boolean
    delete?: wine_categoriesWhereInput | boolean
    connect?: wine_categoriesWhereUniqueInput
    update?: XOR<XOR<wine_categoriesUpdateToOneWithWhereWithoutWine_category_translationsInput, wine_categoriesUpdateWithoutWine_category_translationsInput>, wine_categoriesUncheckedUpdateWithoutWine_category_translationsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersCreateNestedOneWithoutTastingsInput = {
    create?: XOR<usersCreateWithoutTastingsInput, usersUncheckedCreateWithoutTastingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTastingsInput
    connect?: usersWhereUniqueInput
  }

  export type wine_categoriesCreateNestedOneWithoutTastingsInput = {
    create?: XOR<wine_categoriesCreateWithoutTastingsInput, wine_categoriesUncheckedCreateWithoutTastingsInput>
    connectOrCreate?: wine_categoriesCreateOrConnectWithoutTastingsInput
    connect?: wine_categoriesWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersUpdateOneRequiredWithoutTastingsNestedInput = {
    create?: XOR<usersCreateWithoutTastingsInput, usersUncheckedCreateWithoutTastingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTastingsInput
    upsert?: usersUpsertWithoutTastingsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTastingsInput, usersUpdateWithoutTastingsInput>, usersUncheckedUpdateWithoutTastingsInput>
  }

  export type wine_categoriesUpdateOneRequiredWithoutTastingsNestedInput = {
    create?: XOR<wine_categoriesCreateWithoutTastingsInput, wine_categoriesUncheckedCreateWithoutTastingsInput>
    connectOrCreate?: wine_categoriesCreateOrConnectWithoutTastingsInput
    upsert?: wine_categoriesUpsertWithoutTastingsInput
    connect?: wine_categoriesWhereUniqueInput
    update?: XOR<XOR<wine_categoriesUpdateToOneWithWhereWithoutTastingsInput, wine_categoriesUpdateWithoutTastingsInput>, wine_categoriesUncheckedUpdateWithoutTastingsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type tastingsCreateWithoutUsersInput = {
    tid?: string
    full_name?: string | null
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    wine_categories: wine_categoriesCreateNestedOneWithoutTastingsInput
  }

  export type tastingsUncheckedCreateWithoutUsersInput = {
    id?: number
    tid?: string
    full_name?: string | null
    wine_category_id: number
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type tastingsCreateOrConnectWithoutUsersInput = {
    where: tastingsWhereUniqueInput
    create: XOR<tastingsCreateWithoutUsersInput, tastingsUncheckedCreateWithoutUsersInput>
  }

  export type tastingsCreateManyUsersInputEnvelope = {
    data: tastingsCreateManyUsersInput | tastingsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type tastingsUpsertWithWhereUniqueWithoutUsersInput = {
    where: tastingsWhereUniqueInput
    update: XOR<tastingsUpdateWithoutUsersInput, tastingsUncheckedUpdateWithoutUsersInput>
    create: XOR<tastingsCreateWithoutUsersInput, tastingsUncheckedCreateWithoutUsersInput>
  }

  export type tastingsUpdateWithWhereUniqueWithoutUsersInput = {
    where: tastingsWhereUniqueInput
    data: XOR<tastingsUpdateWithoutUsersInput, tastingsUncheckedUpdateWithoutUsersInput>
  }

  export type tastingsUpdateManyWithWhereWithoutUsersInput = {
    where: tastingsScalarWhereInput
    data: XOR<tastingsUpdateManyMutationInput, tastingsUncheckedUpdateManyWithoutUsersInput>
  }

  export type tastingsScalarWhereInput = {
    AND?: tastingsScalarWhereInput | tastingsScalarWhereInput[]
    OR?: tastingsScalarWhereInput[]
    NOT?: tastingsScalarWhereInput | tastingsScalarWhereInput[]
    id?: IntFilter<"tastings"> | number
    tid?: UuidFilter<"tastings"> | string
    uid?: UuidFilter<"tastings"> | string
    full_name?: StringNullableFilter<"tastings"> | string | null
    wine_category_id?: IntFilter<"tastings"> | number
    wine_denomination?: StringFilter<"tastings"> | string
    alcohol_content?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    vintage?: IntFilter<"tastings"> | number
    wine_temperature?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFilter<"tastings"> | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFilter<"tastings"> | Date | string
    tasting_time?: DateTimeFilter<"tastings"> | Date | string
    tasting_location?: StringFilter<"tastings"> | string
    created_at?: DateTimeNullableFilter<"tastings"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"tastings"> | Date | string | null
  }

  export type tastingsCreateWithoutWine_categoriesInput = {
    tid?: string
    full_name?: string | null
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    users: usersCreateNestedOneWithoutTastingsInput
  }

  export type tastingsUncheckedCreateWithoutWine_categoriesInput = {
    id?: number
    tid?: string
    uid: string
    full_name?: string | null
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type tastingsCreateOrConnectWithoutWine_categoriesInput = {
    where: tastingsWhereUniqueInput
    create: XOR<tastingsCreateWithoutWine_categoriesInput, tastingsUncheckedCreateWithoutWine_categoriesInput>
  }

  export type tastingsCreateManyWine_categoriesInputEnvelope = {
    data: tastingsCreateManyWine_categoriesInput | tastingsCreateManyWine_categoriesInput[]
    skipDuplicates?: boolean
  }

  export type wine_category_translationsCreateWithoutWine_categoriesInput = {
    language_code: string
    name: string
  }

  export type wine_category_translationsUncheckedCreateWithoutWine_categoriesInput = {
    id?: number
    language_code: string
    name: string
  }

  export type wine_category_translationsCreateOrConnectWithoutWine_categoriesInput = {
    where: wine_category_translationsWhereUniqueInput
    create: XOR<wine_category_translationsCreateWithoutWine_categoriesInput, wine_category_translationsUncheckedCreateWithoutWine_categoriesInput>
  }

  export type wine_category_translationsCreateManyWine_categoriesInputEnvelope = {
    data: wine_category_translationsCreateManyWine_categoriesInput | wine_category_translationsCreateManyWine_categoriesInput[]
    skipDuplicates?: boolean
  }

  export type tastingsUpsertWithWhereUniqueWithoutWine_categoriesInput = {
    where: tastingsWhereUniqueInput
    update: XOR<tastingsUpdateWithoutWine_categoriesInput, tastingsUncheckedUpdateWithoutWine_categoriesInput>
    create: XOR<tastingsCreateWithoutWine_categoriesInput, tastingsUncheckedCreateWithoutWine_categoriesInput>
  }

  export type tastingsUpdateWithWhereUniqueWithoutWine_categoriesInput = {
    where: tastingsWhereUniqueInput
    data: XOR<tastingsUpdateWithoutWine_categoriesInput, tastingsUncheckedUpdateWithoutWine_categoriesInput>
  }

  export type tastingsUpdateManyWithWhereWithoutWine_categoriesInput = {
    where: tastingsScalarWhereInput
    data: XOR<tastingsUpdateManyMutationInput, tastingsUncheckedUpdateManyWithoutWine_categoriesInput>
  }

  export type wine_category_translationsUpsertWithWhereUniqueWithoutWine_categoriesInput = {
    where: wine_category_translationsWhereUniqueInput
    update: XOR<wine_category_translationsUpdateWithoutWine_categoriesInput, wine_category_translationsUncheckedUpdateWithoutWine_categoriesInput>
    create: XOR<wine_category_translationsCreateWithoutWine_categoriesInput, wine_category_translationsUncheckedCreateWithoutWine_categoriesInput>
  }

  export type wine_category_translationsUpdateWithWhereUniqueWithoutWine_categoriesInput = {
    where: wine_category_translationsWhereUniqueInput
    data: XOR<wine_category_translationsUpdateWithoutWine_categoriesInput, wine_category_translationsUncheckedUpdateWithoutWine_categoriesInput>
  }

  export type wine_category_translationsUpdateManyWithWhereWithoutWine_categoriesInput = {
    where: wine_category_translationsScalarWhereInput
    data: XOR<wine_category_translationsUpdateManyMutationInput, wine_category_translationsUncheckedUpdateManyWithoutWine_categoriesInput>
  }

  export type wine_category_translationsScalarWhereInput = {
    AND?: wine_category_translationsScalarWhereInput | wine_category_translationsScalarWhereInput[]
    OR?: wine_category_translationsScalarWhereInput[]
    NOT?: wine_category_translationsScalarWhereInput | wine_category_translationsScalarWhereInput[]
    id?: IntFilter<"wine_category_translations"> | number
    category_id?: IntNullableFilter<"wine_category_translations"> | number | null
    language_code?: StringFilter<"wine_category_translations"> | string
    name?: StringFilter<"wine_category_translations"> | string
  }

  export type wine_categoriesCreateWithoutWine_category_translationsInput = {
    code: string
    tastings?: tastingsCreateNestedManyWithoutWine_categoriesInput
  }

  export type wine_categoriesUncheckedCreateWithoutWine_category_translationsInput = {
    id?: number
    code: string
    tastings?: tastingsUncheckedCreateNestedManyWithoutWine_categoriesInput
  }

  export type wine_categoriesCreateOrConnectWithoutWine_category_translationsInput = {
    where: wine_categoriesWhereUniqueInput
    create: XOR<wine_categoriesCreateWithoutWine_category_translationsInput, wine_categoriesUncheckedCreateWithoutWine_category_translationsInput>
  }

  export type wine_categoriesUpsertWithoutWine_category_translationsInput = {
    update: XOR<wine_categoriesUpdateWithoutWine_category_translationsInput, wine_categoriesUncheckedUpdateWithoutWine_category_translationsInput>
    create: XOR<wine_categoriesCreateWithoutWine_category_translationsInput, wine_categoriesUncheckedCreateWithoutWine_category_translationsInput>
    where?: wine_categoriesWhereInput
  }

  export type wine_categoriesUpdateToOneWithWhereWithoutWine_category_translationsInput = {
    where?: wine_categoriesWhereInput
    data: XOR<wine_categoriesUpdateWithoutWine_category_translationsInput, wine_categoriesUncheckedUpdateWithoutWine_category_translationsInput>
  }

  export type wine_categoriesUpdateWithoutWine_category_translationsInput = {
    code?: StringFieldUpdateOperationsInput | string
    tastings?: tastingsUpdateManyWithoutWine_categoriesNestedInput
  }

  export type wine_categoriesUncheckedUpdateWithoutWine_category_translationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    tastings?: tastingsUncheckedUpdateManyWithoutWine_categoriesNestedInput
  }

  export type usersCreateWithoutTastingsInput = {
    uid?: string
    username?: string | null
    full_name?: string | null
    birthdate?: Date | string | null
    email?: string | null
    password_hash?: string | null
    admin?: boolean | null
    premium?: boolean | null
    google_id?: string | null
    facebook_id?: string | null
    apple_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUncheckedCreateWithoutTastingsInput = {
    id?: number
    uid?: string
    username?: string | null
    full_name?: string | null
    birthdate?: Date | string | null
    email?: string | null
    password_hash?: string | null
    admin?: boolean | null
    premium?: boolean | null
    google_id?: string | null
    facebook_id?: string | null
    apple_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersCreateOrConnectWithoutTastingsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTastingsInput, usersUncheckedCreateWithoutTastingsInput>
  }

  export type wine_categoriesCreateWithoutTastingsInput = {
    code: string
    wine_category_translations?: wine_category_translationsCreateNestedManyWithoutWine_categoriesInput
  }

  export type wine_categoriesUncheckedCreateWithoutTastingsInput = {
    id?: number
    code: string
    wine_category_translations?: wine_category_translationsUncheckedCreateNestedManyWithoutWine_categoriesInput
  }

  export type wine_categoriesCreateOrConnectWithoutTastingsInput = {
    where: wine_categoriesWhereUniqueInput
    create: XOR<wine_categoriesCreateWithoutTastingsInput, wine_categoriesUncheckedCreateWithoutTastingsInput>
  }

  export type usersUpsertWithoutTastingsInput = {
    update: XOR<usersUpdateWithoutTastingsInput, usersUncheckedUpdateWithoutTastingsInput>
    create: XOR<usersCreateWithoutTastingsInput, usersUncheckedCreateWithoutTastingsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTastingsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTastingsInput, usersUncheckedUpdateWithoutTastingsInput>
  }

  export type usersUpdateWithoutTastingsInput = {
    uid?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    premium?: NullableBoolFieldUpdateOperationsInput | boolean | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateWithoutTastingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    premium?: NullableBoolFieldUpdateOperationsInput | boolean | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type wine_categoriesUpsertWithoutTastingsInput = {
    update: XOR<wine_categoriesUpdateWithoutTastingsInput, wine_categoriesUncheckedUpdateWithoutTastingsInput>
    create: XOR<wine_categoriesCreateWithoutTastingsInput, wine_categoriesUncheckedCreateWithoutTastingsInput>
    where?: wine_categoriesWhereInput
  }

  export type wine_categoriesUpdateToOneWithWhereWithoutTastingsInput = {
    where?: wine_categoriesWhereInput
    data: XOR<wine_categoriesUpdateWithoutTastingsInput, wine_categoriesUncheckedUpdateWithoutTastingsInput>
  }

  export type wine_categoriesUpdateWithoutTastingsInput = {
    code?: StringFieldUpdateOperationsInput | string
    wine_category_translations?: wine_category_translationsUpdateManyWithoutWine_categoriesNestedInput
  }

  export type wine_categoriesUncheckedUpdateWithoutTastingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    wine_category_translations?: wine_category_translationsUncheckedUpdateManyWithoutWine_categoriesNestedInput
  }

  export type tastingsCreateManyUsersInput = {
    id?: number
    tid?: string
    full_name?: string | null
    wine_category_id: number
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type tastingsUpdateWithoutUsersInput = {
    tid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wine_categories?: wine_categoriesUpdateOneRequiredWithoutTastingsNestedInput
  }

  export type tastingsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    tid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_category_id?: IntFieldUpdateOperationsInput | number
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tastingsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    tid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_category_id?: IntFieldUpdateOperationsInput | number
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tastingsCreateManyWine_categoriesInput = {
    id?: number
    tid?: string
    uid: string
    full_name?: string | null
    wine_denomination: string
    alcohol_content: Decimal | DecimalJsLike | number | string
    vintage: number
    wine_temperature: Decimal | DecimalJsLike | number | string
    ambient_temperature: Decimal | DecimalJsLike | number | string
    tasting_date: Date | string
    tasting_time: Date | string
    tasting_location: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type wine_category_translationsCreateManyWine_categoriesInput = {
    id?: number
    language_code: string
    name: string
  }

  export type tastingsUpdateWithoutWine_categoriesInput = {
    tid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutTastingsNestedInput
  }

  export type tastingsUncheckedUpdateWithoutWine_categoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    tid?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tastingsUncheckedUpdateManyWithoutWine_categoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    tid?: StringFieldUpdateOperationsInput | string
    uid?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    wine_denomination?: StringFieldUpdateOperationsInput | string
    alcohol_content?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vintage?: IntFieldUpdateOperationsInput | number
    wine_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ambient_temperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tasting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_time?: DateTimeFieldUpdateOperationsInput | Date | string
    tasting_location?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type wine_category_translationsUpdateWithoutWine_categoriesInput = {
    language_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type wine_category_translationsUncheckedUpdateWithoutWine_categoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    language_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type wine_category_translationsUncheckedUpdateManyWithoutWine_categoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    language_code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}