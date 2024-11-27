import { Injectable, ExecutionContext, SetMetadata } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  protected readonly reflector: Reflector;

  constructor(cacheManager: any, reflector: Reflector) {
    super(cacheManager, reflector); // Pass dependencies to the base class
    this.reflector = reflector;
  }

  trackBy(context: ExecutionContext): string | undefined {
    const isSkipCache = this.reflector.get<boolean>(
      'isSkipCache',
      context.getHandler(),
    );
    if (isSkipCache) {
      return undefined;
    }

    return super.trackBy(context);
  }
}
export const SkipCache = () => SetMetadata('isSkipCache', true);
