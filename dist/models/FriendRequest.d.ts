import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";
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
//# sourceMappingURL=friendRequest.d.ts.map