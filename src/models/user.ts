import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export class User {
  readonly _id!: ObjectId;

  readonly createdAt!: Date;

  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true })
  public fullName!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: null })
  public avatarUrl?: string | null;

  @prop({ default: null })
  public bio?: string | null;

  @prop({ default: false })
  public isOnline?: boolean;

  @prop({ default: null })
  public lastSeen?: Date | null;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
