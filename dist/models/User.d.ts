import { ObjectId } from "mongodb";
export declare class User {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    username: string;
    fullName: string;
    email: string;
    password: string;
    avatarUrl?: string | null;
    bio?: string | null;
    isOnline?: boolean;
    lastSeen?: Date | null;
}
export declare const UserModel: import("@typegoose/typegoose").ReturnModelType<typeof User, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=User.d.ts.map