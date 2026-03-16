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
exports.BlockedUserModel = exports.BlockedUser = void 0;
const typegoose_1 = require("@typegoose/typegoose");
<<<<<<< HEAD
const User_1 = require("./User");
=======
const user_1 = require("./user");
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
class BlockedUser {
}
exports.BlockedUser = BlockedUser;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], BlockedUser.prototype, "id", void 0);
__decorate([
<<<<<<< HEAD
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
    __metadata("design:type", Object)
], BlockedUser.prototype, "blockerId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
=======
    (0, typegoose_1.prop)({ required: true, ref: () => user_1.User }),
    __metadata("design:type", Object)
], BlockedUser.prototype, "blockerId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_1.User }),
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
    __metadata("design:type", Object)
], BlockedUser.prototype, "blockedId", void 0);
exports.BlockedUserModel = (0, typegoose_1.getModelForClass)(BlockedUser, {
    schemaOptions: { timestamps: true },
});
<<<<<<< HEAD
//# sourceMappingURL=BlockedUser.js.map
=======
//# sourceMappingURL=blockedUser.js.map
>>>>>>> 9699da23981e5a07e6f2cac1c38569c3dd1c87a9
