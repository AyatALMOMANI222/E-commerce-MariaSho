import {
  callIcon,
  productsIcon,
  dresse,
  jeans,
  outerwear,
  sales,
  topIcon,
  jewelry,
  shoes,
} from "../icons";
export const modules = [
  {
    title: "Admin",
    children: [
      {
        name: "Admin Settings",
        icon: topIcon,
        children: [
          { name: "All Product", path: "/product" },
          { name: "Add Product" },
        ],
      },
    ],
  },
  {
    title: "Catogary",
    children: [
      {
        name: "Tops",
        icon: topIcon,
        children: [
          { name: "T-shirts" },
          { name: "Blouses" },
          { name: "Tanks" },
        ],
      },
      {
        name: "Bottoms",
        icon: jeans,
        children: [{ name: "Jeans" }, { name: "Pants" }, { name: "Skirts" }],
      },
      {
        name: "Dresses",
        icon: dresse,
        children: [
          { name: "Casual Dresses" },
          { name: "Formal Dresses" },
          { name: "Maxi Dresses" },
        ],
      },
      // {
      //   name: "Outerwear",
      //   icon: outerwear,
      //   children: [{ name: "Jackets" }, { name: "Coats" }, { name: "Blazers" }],
      // },

      // {
      //   name: "Accessories",
      //   icon: jewelry,
      //   children: [{ name: "Scarves" }, { name: "Hats" }, { name: "Belts" }],
      // },
      // {
      //   name: "Shoes",
      //   icon: shoes,
      //   children: [
      //     { name: "Sneakers" },
      //     { name: "Boots" },
      //     { name: "Sandals" },
      //   ],
      // },
      // {
      //   name: "Sales & Promotions",
      //   icon: sales,
      //   children: [
      //     { name: "Seasonal Sales" },
      //     { name: "Holiday Sales" },
      //     { name: "Flash Sales" },
      //   ],
      // },
    ],
  },
];
