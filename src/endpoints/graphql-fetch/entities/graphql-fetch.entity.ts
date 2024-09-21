import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Unique identifier for the user' })
  id: number;

  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => Int, { description: 'Age of the user' })
  age: number;
}
