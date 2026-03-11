import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";

export enum FriendRequestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}


export class FriendRequest {
  readonly _id!: ObjectId;

  readonly createdAt!: Date;

  @prop({ required: true, ref: () => User })
  public senderId!: Ref<User>;

  @prop({ required: true, ref: () => User })
  public receiverId!: Ref<User>;

  @prop({ default: FriendRequestStatus.Pending })
  public status?: FriendRequestStatus;

}

export const FriendRequestModel = getModelForClass(FriendRequest, {
  schemaOptions: { timestamps: true },
});
