"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yourOwn = function (_a) {
    var user = _a.req.user;
    if (!user)
        return false;
    if (user.role === "admin")
        return true;
    return {
        user: {
            equals: user === null || user === void 0 ? void 0 : user.id,
        },
    };
};
var Orders = {
    slug: "orders",
    admin: {
        useAsTitle: "Tus pedidos",
        description: "Aquí puedes ver tus pedidos",
    },
    access: {
        read: yourOwn,
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            label: "Pagado",
            access: {
                read: function (_a) {
                    var _b;
                    var req = _a.req;
                    return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
                },
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            label: "Usuario",
            required: true,
            hasMany: false,
            admin: {
                hidden: true,
            },
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            hasMany: true,
            required: true,
        },
    ],
};
exports.default = Orders;
