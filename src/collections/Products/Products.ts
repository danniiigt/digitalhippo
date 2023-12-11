import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-types";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;
  return { ...data, user: user.id };
};

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;
          const createdProduct = await stripe.products.create({
            name: data.name!,
            default_price_data: {
              currency: "EUR",
              unit_amount: Math.round(data.price * 100),
            },
          });

          const updated: Product = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          };

          return updated;
        } else if (args.operation === "update") {
          const data = args.data as Product;

          const updatedProduct = await stripe.products.update(data.stripeId!, {
            name: data.name!,
            default_price: data.priceId!,
          });

          const updated: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: updatedProduct.default_price as string,
          };

          return updated;
        }
      },
    ],
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
