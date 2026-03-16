import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
<<<<<<< HEAD
import { User } from "./User";
=======
import { User } from "./user";
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
export declare class BlockedUser {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    id: string;
    blockerId: Ref<User>;
    blockedId: Ref<User>;
}
export declare const BlockedUserModel: import("@typegoose/typegoose").ReturnModelType<typeof BlockedUser, import("@typegoose/typegoose/lib/types").BeAnObject>;
<<<<<<< HEAD
//# sourceMappingURL=BlockedUser.d.ts.map
=======
//# sourceMappingURL=blockedUser.d.ts.map
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
