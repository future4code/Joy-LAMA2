import { BaseDatabase } from "./BaseDatabase";
import { User, UserInputDTO } from "../model/User";
import { InvalidEmail } from "../error/CustomError";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_USERS";

  public async createUser(input: UserInputDTO): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: input.id,
          email: input.email,
          name: input.name,
          password: input.password,
          role: input.role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
      
      if(!result[0]) {
        throw new InvalidEmail();
    }

    return User.toUserModel(result[0]);
  }

}
