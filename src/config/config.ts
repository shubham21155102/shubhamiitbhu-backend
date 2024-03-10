import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: process.env.NODE_ENV
    ? process.env.NODE_ENV.trim() !== 'DEV'
      ? '.env.prod'
      : '.env.dev'
    : '.env.dev',
});
class ConfigService {
  public typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
      return {
        type: 'postgres',
        host: this.getValue('POSTGRES_HOST'),
        port: parseInt(this.getValue('POSTGRES_PORT')),
        username: this.getValue('POSTGRES_USER'),
        password: this.getValue('POSTGRES_PASSWORD'),
        database: this.getValue('POSTGRES_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
        ssl:
          this.getValue('POSTGRES_SSL') === 'true'
            ? {
                ca: readFileSync(
                  join(
                    __dirname,
                    '../../data/db/ca-certificate.crt',
                    // '..',
                    // 'data',
                    // 'db',
                    // 'ca-certificate.crt',
                  ),
                  // join(__dirname, '/etc/secrets/ca-certificate.crt'),
                ).toString(),
              }
            : false,
        synchronize: true,
        poolSize: 5,
      };
    },
  };
  public typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: this.getValue('POSTGRES_HOST'),
    port: parseInt(this.getValue('POSTGRES_PORT')),
    username: this.getValue('POSTGRES_USER'),
    password: this.getValue('POSTGRES_PASSWORD'),
    database: this.getValue('POSTGRES_DATABASE'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    ssl:
      this.getValue('POSTGRES_SSL') === 'true'
        ? {
            ca: readFileSync(
              join(__dirname, '../../data/db/ca-certificate.crt'),
              // join(__dirname, '/etc/secrets/ca-certificate.crt'),
            ).toString(),
          }
        : false,
    synchronize: true,
    logging: true,
  };
  constructor(private env: { [k: string]: string | undefined }) {}
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }
  public getRedisConnectionString(): string {
    // console.log(
    //   `${this.getRedisPrefix()}://${this.getRedisUser()}:${this.getRedisPassword()}@${this.getRedisURL()}:${this.getRedisPort()}`,
    // );
    // return `${this.getRedisPrefix()}://${this.getRedisUser()}:${this.getRedisPassword()}@${this.getRedisURL()}:${this.getRedisPort()}`;
    return this.getValue('REDIS_URI2', true);
  }

  public getRedisTLS(): string {
    return this.getValue('REDIS_TLS', true);
  }

  public getRedisPrefix(): string {
    return this.getValue('REDIS_PREFIX', true);
  }

  public getRedisURL(): string {
    return this.getValue('REDIS_URL', true);
  }

  public getRedisPort(): string {
    return this.getValue('REDIS_PORT', true);
  }

  public getRedisUser(): string {
    return this.getValue('REDIS_USER', true);
  }

  public getRedisPassword(): string {
    return this.getValue('REDIS_PASSWORD', true);
  }
  public getPort(): number {
    return parseInt(this.getValue('PORT', true));
  }
  public getJWTSecret(): string {
    return this.getValue('JWT_SECRET', true);
  }
  public getCashFreeConfigs() {
    return {
      appId: this.getValue('XClientId'),
      secretKey: this.getValue('XClientSecret'),
      url: this.getValue('CashFreeLink'),
    };
  }
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing)
      throw new Error(`config error - missing env.${key}`);

    return value;
  }
}
const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);
export { configService };
