import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";
import { Conversation } from "./conversation";
export declare enum MessageType {
    Text = "text",
    Image = "image",
    Video = "video",
    File = "file"
}
export declare class Message {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    senderId: Ref<User>;
    conversationId: Ref<Conversation>;
    content: string;
    status?: string;
    type?: MessageType;
    mediaUrl?: string | null;
    isDeleted?: boolean;
}
export declare const MessageModel: import("@typegoose/typegoose").ReturnModelType<typeof Message, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=message.d.ts.map