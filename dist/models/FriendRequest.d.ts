import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
<<<<<<< HEAD
import { User } from "./User";
=======
import { User } from "./user";
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
export declare enum FriendRequestStatus {
    Pending = "pending",
    Accepted = "accepted",
    Rejected = "rejected"
}
export declare class FriendRequest {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    senderId: Ref<User>;
    receiverId: Ref<User>;
    status?: FriendRequestStatus;
}
export declare const FriendRequestModel: import("@typegoose/typegoose").ReturnModelType<typeof FriendRequest, import("@typegoose/typegoose/lib/types").BeAnObject>;
<<<<<<< HEAD
//# sourceMappingURL=FriendRequest.d.ts.map
=======
//# sourceMappingURL=friendRequest.d.ts.map
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
