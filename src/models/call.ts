import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";

export class Call {
  readonly _id!: ObjectId;
  readonly createdAt!: Date;

  @prop({ required: true })
  public id!: string;

  @prop({ required: true, ref: () => User })
  public callerId!: Ref<User>;

  @prop({ required: true, ref: () => User })
  public receiverId!: Ref<User>;

  @prop({ required: true })
  public callType!: string;

  @prop({ default: "ringing" })
  public status?: string;

  @prop({ default: null })
  public startedAt?: Date | null;

  @prop({ default: null })
  public endedAt?: Date | null;

  @prop({ default: null })
  public duration?: number | null;
}

export const CallModel = getModelForClass(Call, {
  schemaOptions: { timestamps: true },
});
