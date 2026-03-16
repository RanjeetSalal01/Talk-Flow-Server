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
exports.CallModel = exports.Call = exports.CallType = exports.CallStatus = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
var CallStatus;
(function (CallStatus) {
    CallStatus["Ringing"] = "ringing";
    CallStatus["Active"] = "active";
    CallStatus["Ended"] = "ended";
    CallStatus["Rejected"] = "rejected";
    CallStatus["Missed"] = "missed";
    CallStatus["Busy"] = "busy";
})(CallStatus || (exports.CallStatus = CallStatus = {}));
var CallType;
(function (CallType) {
    CallType["Audio"] = "audio";
    CallType["Video"] = "video";
})(CallType || (exports.CallType = CallType = {}));
class Call {
}
exports.Call = Call;
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
    __metadata("design:type", Object)
], Call.prototype, "callerId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => User_1.User }),
    __metadata("design:type", Object)
], Call.prototype, "receiverId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: CallType }),
    __metadata("design:type", String)
], Call.prototype, "callType", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: CallStatus.Ringing, enum: CallStatus }),
    __metadata("design:type", String)
], Call.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Call.prototype, "startedAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Call.prototype, "endedAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], Call.prototype, "duration", void 0);
exports.CallModel = (0, typegoose_1.getModelForClass)(Call, {
    schemaOptions: { timestamps: true },
});
//# sourceMappingURL=Call.js.map