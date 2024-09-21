import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class NoCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const ctx = GqlExecutionContext.create(context);
    console.log('Request context:', ctx.getContext());
    return undefined; // Disables caching
  }
}
