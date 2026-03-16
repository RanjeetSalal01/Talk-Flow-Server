import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";

export class ConversationType {
  Private = "private";
  Group = "group";
}

export class Conversation {
  readonly _id!: ObjectId;

  readonly createdAt!: Date;

  @prop({ required: true })
  public type!: string;

  @prop({ ref: () => User })
  members?: Ref<User>[];

  @prop({ ref: () => User })
  admins?: Ref<User>[];

  @prop({})
  public groupAvatar?: string;

  @prop({})
  groupName?: string;

  @prop({})
  lastMessage!: string;

  @prop({})
  public lastMessageAt?: Date | null;
}

export const ConversationModel = getModelForClass(Conversation, {
  schemaOptions: { timestamps: true },
});
