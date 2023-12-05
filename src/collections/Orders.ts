import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Tus pedidos",
    description: "Aquí puedes ver tus pedidos",
  },
  access: {
    read: yourOwn,
    create: ({ req }) => req.user.role === "admin",
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      label: "Pagado",
      access: {
        read: ({ req }) => req.user?.role === "admin",
        create: () => false,
        update: () => false,
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
export default Orders;
