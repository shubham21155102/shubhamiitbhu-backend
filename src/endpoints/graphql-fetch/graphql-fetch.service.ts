import { Injectable } from '@nestjs/common';
import { CreateGraphqlFetchInput } from './dto/create-graphql-fetch.input';
import { UpdateGraphqlFetchInput } from './dto/update-graphql-fetch.input';
import { User } from './entities/graphql-fetch.entity';

@Injectable()
export class GraphqlFetchService {
  private users: User[] = [];
  create(createGraphqlFetchInput: CreateGraphqlFetchInput) {
    const newUser: User = {
      id: this.users.length + 1,
      ...createGraphqlFetchInput,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateGraphqlFetchInput: UpdateGraphqlFetchInput) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateGraphqlFetchInput,
    };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const removedUser = this.users[userIndex];
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
