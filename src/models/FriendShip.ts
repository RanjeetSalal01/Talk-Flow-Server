import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";

export class FriendShip {
  readonly _id!: ObjectId;

  readonly createdAt!: Date;

  @prop({ required: true, ref: () => User })
  public participants!: Ref<User>[];

  @prop({ default: "pending" })
  public status?: string;

}

export const FriendShipModel = getModelForClass(FriendShip, {
  schemaOptions: { timestamps: true },
});
