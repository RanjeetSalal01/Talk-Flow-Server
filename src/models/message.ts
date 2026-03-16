import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";
import { Conversation } from "./Conversation";

export enum MessageType {
  Text = "text",
  Image = "image",
  Video = "video",
  File = "file",
}

export class Message {
  readonly _id!: ObjectId;

  readonly createdAt!: Date;

  @prop({ required: true, ref: () => User })
  public senderId!: Ref<User>;

  @prop({ required: true, ref: () => Conversation })
  public  conversationId!: Ref<Conversation>;

  @prop({ required: true })
  public content!: string;

  @prop({ default: "sent" })
  public status?: string;

  @prop({ enum: MessageType, default: MessageType.Text })
  public type?: MessageType;

  @prop({ default: null })
  public mediaUrl?: string | null;

  @prop({ default: false })
  public isDeleted?: boolean;
}

export const MessageModel = getModelForClass(Message, {
  schemaOptions: { timestamps: true },
});
