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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const payout_1 = require("../utils/api/payout");
const payout_option = new commander_1.Option("--payout <batchId>", "show details for a given payment ID");
const details = new commander_1.Command("details")
    .description("show details for an entry")
    .addOption(payout_option)
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    if (options.payout) {
        const details = yield (0, payout_1.getPayoutDetails)(options.payout);
    }
}));
module.exports = details;
//# sourceMappingURL=details.js.map