import { CreateGraphqlFetchInput } from './create-graphql-fetch.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGraphqlFetchInput extends PartialType(
  CreateGraphqlFetchInput,
) {
  @Field(() => Int)
  id: number;
}
