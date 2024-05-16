"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storedOrders = void 0;
const pgConfig_1 = __importDefault(require("./pgConfig"));
function storedOrders(orderNo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "INSERT INTO orders (orderID) VALUES ($1)";
            const result = yield pgConfig_1.default.query(query, [orderNo]);
            console.log('Inserted order:', orderNo);
            return result;
        }
        catch (err) {
            console.error('Error while inserting order:', err);
            throw err;
        }
    });
}
exports.storedOrders = storedOrders;
//# sourceMappingURL=services.js.map