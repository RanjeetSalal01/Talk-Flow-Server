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
exports.ConversationModel = exports.Conversation = exports.ConversationType = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
class ConversationType {
    constructor() {
        this.Private = "private";
        this.Group = "group";
    }
}
exports.ConversationType = ConversationType;
class Conversation {
}
exports.Conversation = Conversation;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Conversation.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => User_1.User }),
    __metadata("design:type", Array)
], Conversation.prototype, "members", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => User_1.User }),
    __metadata("design:type", Array)
], Conversation.prototype, "admins", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Conversation.prototype, "groupAvatar", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Conversation.prototype, "groupName", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Conversation.prototype, "lastMessage", void 0);
__decorate([
    (0, typegoose_1.prop)({}),
    __metadata("design:type", Object)
], Conversation.prototype, "lastMessageAt", void 0);
exports.ConversationModel = (0, typegoose_1.getModelForClass)(Conversation, {
    schemaOptions: { timestamps: true },
});
//# sourceMappingURL=Conversation.js.map