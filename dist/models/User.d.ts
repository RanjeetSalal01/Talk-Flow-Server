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
<<<<<<< HEAD
//# sourceMappingURL=User.d.ts.map
=======
//# sourceMappingURL=user.d.ts.map
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
