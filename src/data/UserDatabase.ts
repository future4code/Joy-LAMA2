import { BaseDatabase } from "./BaseDatabase";
import { User, UserInput } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_USERS";

  public async createUser(input: UserInput): Promise<void> {
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

    return User.toUserModel(result[0]);
  }

}
