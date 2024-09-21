import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GraphqlFetchService } from './graphql-fetch.service';
import { User } from './entities/graphql-fetch.entity';
import { CreateGraphqlFetchInput } from './dto/create-graphql-fetch.input';
import { UpdateGraphqlFetchInput } from './dto/update-graphql-fetch.input';
// import { GqlCacheInterceptor } from './gql-cache.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { NoCacheInterceptor } from './gql-cache.interceptor';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly graphqlFetchService: GraphqlFetchService) {}
  @Mutation(() => User)
  @UseInterceptors(NoCacheInterceptor)
  createUser(
    @Args('createGraphqlFetchInput')
    createGraphqlFetchInput: CreateGraphqlFetchInput,
  ) {
    return this.graphqlFetchService.create(createGraphqlFetchInput);
  }
  @Query(() => [User], { name: 'users' })
  @UseInterceptors(NoCacheInterceptor)
  findAllUsers() {
    return this.graphqlFetchService.findAll();
  }
  @Query(() => User, { name: 'user' })
  @UseInterceptors(NoCacheInterceptor)
  findOneUser(@Args('id', { type: () => Int }) id: number) {
    return this.graphqlFetchService.findOne(id);
  }
  @Mutation(() => User)
  updateUser(
    @Args('updateGraphqlFetchInput')
    updateGraphqlFetchInput: UpdateGraphqlFetchInput,
  ) {
    return this.graphqlFetchService.update(
      updateGraphqlFetchInput.id,
      updateGraphqlFetchInput,
    );
  }
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.graphqlFetchService.remove(id);
  }
}
