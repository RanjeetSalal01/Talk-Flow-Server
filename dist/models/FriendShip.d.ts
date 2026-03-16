import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";
export declare class FriendShip {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    participants: Ref<User>[];
    status?: string;
}
export declare const FriendShipModel: import("@typegoose/typegoose").ReturnModelType<typeof FriendShip, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=FriendShip.d.ts.map