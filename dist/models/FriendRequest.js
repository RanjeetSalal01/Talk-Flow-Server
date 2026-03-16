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
exports.FriendRequestModel = exports.FriendRequest = exports.FriendRequestStatus = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
var FriendRequestStatus;
(function (FriendRequestStatus) {
    FriendRequestStatus["Pending"] = "pending";
    FriendRequestStatus["Accepted"] = "accepted";
    FriendRequestStatus["Rejected"] = "rejected";
})(FriendRequestStatus || (exports.FriendRequestStatus = FriendRequestStatus = {}));
class FriendRequest {
}
exports.FriendRequest = FriendRequest;
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
    __metadata("design:type", Object)
], FriendRequest.prototype, "senderId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
    __metadata("design:type", Object)
], FriendRequest.prototype, "receiverId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: FriendRequestStatus.Pending }),
    __metadata("design:type", String)
], FriendRequest.prototype, "status", void 0);
exports.FriendRequestModel = (0, typegoose_1.getModelForClass)(FriendRequest, {
    schemaOptions: { timestamps: true },
});
//# sourceMappingURL=FriendRequest.js.map