import { Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";
export declare class TypingIndicator {
    readonly _id: ObjectId;
    readonly createdAt: Date;
    userId: Ref<User>;
    chatWith: Ref<User>;
    isTyping?: boolean;
}
export declare const TypingIndicatorModel: import("@typegoose/typegoose").ReturnModelType<typeof TypingIndicator, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=TypingIndicator.d.ts.map