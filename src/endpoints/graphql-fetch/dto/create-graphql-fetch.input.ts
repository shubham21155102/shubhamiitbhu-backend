// import { InputType, Int, Field } from '@nestjs/graphql';

// @InputType()
// export class CreateGraphqlFetchInput {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
//   exampleField: number;
// }
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateGraphqlFetchInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;
}
