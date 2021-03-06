export const CARDS_MENU = [
  {
    name: "Starter",
    isActive: false,
    path: "/menu/starter.jpg",
    gradient:
      "linear-gradient(0deg, rgba(17, 111, 2, 0.45), rgba(17, 111, 2, 0.45))",
  },
  {
    name: "Pizza",
    isActive: true,
    path: "/menu/pizza.jpg",
    gradient:
      "linear-gradient(0deg, rgba(211, 165, 8, 0.68), rgba(211, 165, 8, 0.68))",
  },
  {
    name: "Wine",
    isActive: false,
    path: "/menu/wine.jpg",
    gradient:
      "linear-gradient(0deg, rgba(182, 0, 11, 0.55), rgba(182, 0, 11, 0.55))",
  },
  {
    name: "Drink",
    isActive: false,
    path: "/menu/drink.jpg",
    gradient:
      "linear-gradient(0deg, rgba(1, 54, 134, 0.52), rgba(1, 54, 134, 0.52))",
  },
];

export const CARDS_MENU_DRINKS = [

  {
    name: "Cocktails",
    value: "cocktails",
    isActive: true,
    path: "/menuDrinks/drinks-option.jpg",
  },
  {
    name: "Soda",
    value: "sodas",
    isActive: false,
    path: "/menuDrinks/soda-option.jpg",
  },
  {
    name: "Others",
    value: "others",
    isActive: false,
    path: "/menuDrinks/others-option.jpg",
  },
];

export const SIZE_OPTIONS = [
  {
    label: "Large Round",
    value: "Large",
    isActive: false,
  },
  {
    label: "Medium Round",
    value: "Medium",
    isActive: false,
  },
  {
    label: "Mini Round",
    value: "Mini",
    isActive: false,
  },
];


export const FOOTER_MENU = [
  {
    name: "Home",
    path: '/',
    icon: "home",
    isActive: false,
  },
  {
    name: "Search",
    path: '/search',
    icon: "search",
    isActive: false,
  },
  {
    name: "Orders",
    path: '/my-cart',
    icon: "shopping-cart",
    isActive: false,
  },
  {
    name: "User",
    path: '/profile',
    icon: "user",
    isActive: false,
  },
];
