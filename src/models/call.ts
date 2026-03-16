import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";

export enum CallStatus {
  Ringing = "ringing",
  Active = "active",
  Ended = "ended",
  Rejected = "rejected",
  Missed = "missed",
  Busy = "busy",
}

export enum CallType {
  Audio = "audio",
  Video = "video",
}

export class Call {
  readonly _id!: ObjectId;
  readonly createdAt!: Date;

  @prop({ required: true, ref: () => User })
  public callerId!: Ref<User>;

  @prop({ required: true, ref: () => User })
  public receiverId!: Ref<User>;

  @prop({ required: true, enum: CallType })
  public callType!: CallType;

  @prop({ default: CallStatus.Ringing, enum: CallStatus })
  public status?: CallStatus;

  @prop({ default: null })
  public startedAt?: Date | null;

  @prop({ default: null })
  public endedAt?: Date | null;

  @prop({ default: null })
  public duration?: number | null; // in seconds
}

export const CallModel = getModelForClass(Call, {
  schemaOptions: { timestamps: true },
});