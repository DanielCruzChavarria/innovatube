import { BackendMethod, remult } from "remult";
import { User } from "../dto/User";

export class UserController {

  @BackendMethod({ allowed: true })
  static async getUserByEmail(email: string) {
    return await remult.repo(User).findOne({  where: { email } });
  }
}
