import { Schema, model, Model, Document } from "mongoose";
import { ETableNames } from "../const";

export interface UserAttrs {
  email: string;
  password: string;
}

export interface UserDoc extends Document {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const schema = new Schema(
  {
    email: { type: String, required: true, unique: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        const { __v, _id, password, updatedAt, ...data } = ret;
        return { ...data, id: _id };
      },
    },
  }
);

schema.statics.build = (attrs: UserAttrs): UserDoc => {
  return new User(attrs);
};

export const User = model<UserDoc, UserModel>(ETableNames["user"], schema);
