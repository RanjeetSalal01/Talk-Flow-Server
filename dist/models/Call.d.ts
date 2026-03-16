import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";
export declare enum CallStatus {
    Ringing = "ringing",
    Active = "active",
    Ended = "ended",
    Rejected = "rejected",
    Missed = "missed",
    Busy = "busy"
}
export declare enum CallType {
    Audio = "audio",
    Video = "video"
}
export declare class Call {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    callerId: Ref<User>;
    receiverId: Ref<User>;
    callType: CallType;
    status?: CallStatus;
    startedAt?: Date | null;
    endedAt?: Date | null;
    duration?: number | null;
}
export declare const CallModel: import("@typegoose/typegoose").ReturnModelType<typeof Call, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=call.d.ts.map