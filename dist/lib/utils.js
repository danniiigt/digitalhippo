"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
var cn = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
};
exports.cn = cn;
var formatCurrency = function (value, currency) {
    if (currency === void 0) { currency = "EUR"; }
    // format to EUR SPAIN currency
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: currency,
    }).format(value);
};
exports.formatCurrency = formatCurrency;
