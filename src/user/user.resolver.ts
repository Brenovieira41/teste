import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';
import { User } from './user.types';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return users;
  }

  // @Query(() => User)
  // async user(
  //   @Args('id') id: number
  // ): Promise<User> {
  //   const user = this.userService.findUserById(id);
  //   return user;
  // }

  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }
}
