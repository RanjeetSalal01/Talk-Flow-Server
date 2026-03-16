import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";
export declare class ConversationType {
    Private: string;
    Group: string;
}
export declare class Conversation {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    type: string;
    members?: Ref<User>[];
    admins?: Ref<User>[];
    groupAvatar?: string;
    groupName?: string;
    lastMessage: string;
    lastMessageAt?: Date | null;
}
export declare const ConversationModel: import("@typegoose/typegoose").ReturnModelType<typeof Conversation, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=Conversation.d.ts.map