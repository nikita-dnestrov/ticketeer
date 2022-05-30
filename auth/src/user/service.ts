import { User, UserAttrs } from "./model";
import * as bcrypt from "bcrypt";

class UserService {
  async create(data: UserAttrs) {
    return await User.build(data).save();
  }

  async check(filter: Partial<UserAttrs>) {
    return await User.exists(filter);
  }

  async get(filter: Partial<UserAttrs>) {
    return await User.findOne(filter);
  }

  async delete(filter: Partial<UserAttrs>) {
    return await User.deleteOne(filter);
  }

  async dropUsers() {
    return await User.deleteMany({});
  }

  async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async comparePasswordHash(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

export const userService = new UserService();
