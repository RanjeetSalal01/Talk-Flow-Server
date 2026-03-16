import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";

export class TypingIndicator {
  readonly _id!: ObjectId;
  readonly createdAt!: Date;

  @prop({ required: true, ref: () => User })
  public userId!: Ref<User>;

  @prop({ required: true, ref: () => User })
  public chatWith!: Ref<User>;

  @prop({ default: false })
  public isTyping?: boolean;
}

export const TypingIndicatorModel = getModelForClass(TypingIndicator, {
  schemaOptions: { timestamps: true },
});
