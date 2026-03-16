import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";

export class BlockedUser {
  readonly _id!: ObjectId;
  readonly createdAt!: Date;

  @prop({ required: true })
  public id!: string;

  @prop({ required: true, ref: () => User })
  public blockerId!: Ref<User>;

  @prop({ required: true, ref: () => User })
  public blockedId!: Ref<User>;
}

export const BlockedUserModel = getModelForClass(BlockedUser, {
  schemaOptions: { timestamps: true },
});
