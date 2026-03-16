import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
<<<<<<< HEAD
import { User } from "./User";
=======
import { User } from "./user";
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
export declare class FriendShip {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    participants: Ref<User>[];
    status?: string;
}
export declare const FriendShipModel: import("@typegoose/typegoose").ReturnModelType<typeof FriendShip, import("@typegoose/typegoose/lib/types").BeAnObject>;
<<<<<<< HEAD
//# sourceMappingURL=FriendShip.d.ts.map
=======
//# sourceMappingURL=friendShip.d.ts.map
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
