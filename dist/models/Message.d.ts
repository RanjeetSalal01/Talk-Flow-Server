import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
<<<<<<< HEAD
import { User } from "./User";
import { Conversation } from "./Conversation";
=======
import { User } from "./user";
import { Conversation } from "./conversation";
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
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
<<<<<<< HEAD
//# sourceMappingURL=Message.d.ts.map
=======
//# sourceMappingURL=message.d.ts.map
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
