import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },

  access: {
    create: () => true,
    read: () => true,
    update: () => {
      console.log("hola mundo!!");
      return true;
    },
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
    },
    {
      name: "price",
      label: "Precio (€)",
      min: 0,
      max: 1000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Categoría",
      type: "select",
      options: PRODUCT_CATEGORIES.map((category) => ({
        label: category.label,
        value: category.value,
      })),
      required: true,
    },
    {
      name: "product_files",
      label: "Archivo(s)",
      type: "relationship",
      relationTo: "product_files",
      required: true,
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Estatus",
      type: "select",
      defaultValue: "pending",
      options: [
        {
          label: "Pendiente",
          value: "pending",
        },
        {
          label: "Aprobado",
          value: "approved",
        },
        {
          label: "Denegado",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Imagenes",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Imagen",
        plural: "Imagenes",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

export default Products;
