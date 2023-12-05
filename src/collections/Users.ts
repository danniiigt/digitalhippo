import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verificar-email?token=${token}">Verificar cuenta</a>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["id"],
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      // admin: {
      //   condition: () => false,
      // },
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    // {
    //   name: "email",
    //   type: "email",
    //   required: true,
    // },
    // {
    //   name: "password",
    //   type: ""
    //   required: true,
    // },
  ],
};

export default Users;
