export type ProductCategory = {
  label: string;
  value: string;
  featured: {
    name: string;
    href: string;
    imageSrc: string;
  }[];
};

export const PRODUCT_CATEGORIES = [
  {
    label: "Kits UI",
    value: "ui_kits" as const,
    featured: [
      {
        name: "La elección del editor 🏆",
        href: "#",
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "Nuevos lanzamientos 🆕",
        href: "#",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Los más vendidos 🔥",
        href: "#",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Iconos",
    value: "icons" as const,
    featured: [
      {
        name: "Los favoritos ❤️",
        href: "#",
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "Más recientes ⏰",
        href: "#",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Los más vendidos 🔥",
        href: "#",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];
