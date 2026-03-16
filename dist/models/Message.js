"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = exports.Message = exports.MessageType = void 0;
const typegoose_1 = require("@typegoose/typegoose");
<<<<<<< HEAD
const User_1 = require("./User");
const Conversation_1 = require("./Conversation");
=======
const user_1 = require("./user");
const conversation_1 = require("./conversation");
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
var MessageType;
(function (MessageType) {
    MessageType["Text"] = "text";
    MessageType["Image"] = "image";
    MessageType["Video"] = "video";
    MessageType["File"] = "file";
})(MessageType || (exports.MessageType = MessageType = {}));
class Message {
}
exports.Message = Message;
__decorate([
<<<<<<< HEAD
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
    __metadata("design:type", Object)
], Message.prototype, "senderId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => Conversation_1.Conversation }),
=======
    (0, typegoose_1.prop)({ required: true, ref: () => user_1.User }),
    __metadata("design:type", Object)
], Message.prototype, "senderId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => conversation_1.Conversation }),
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
    __metadata("design:type", Object)
], Message.prototype, "conversationId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: "sent" }),
    __metadata("design:type", String)
], Message.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: MessageType, default: MessageType.Text }),
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Message.prototype, "mediaUrl", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "isDeleted", void 0);
exports.MessageModel = (0, typegoose_1.getModelForClass)(Message, {
    schemaOptions: { timestamps: true },
});
<<<<<<< HEAD
//# sourceMappingURL=Message.js.map
=======
//# sourceMappingURL=message.js.map
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
