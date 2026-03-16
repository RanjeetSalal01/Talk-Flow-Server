import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";
export declare class BlockedUser {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    id: string;
    blockerId: Ref<User>;
    blockedId: Ref<User>;
}
export declare const BlockedUserModel: import("@typegoose/typegoose").ReturnModelType<typeof BlockedUser, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=BlockedUser.d.ts.map