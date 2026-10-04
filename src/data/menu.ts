export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  tags?: string[];
};

export const MENU_CATEGORIES = [
  "Craft Beers",
  "Wood-Fired",
  "Clay Oven",
  "Grazing",
  "Cocktails",
  "Desserts"
];

export const MENU_DATA: MenuItem[] = [
  {
    id: "m1",
    category: "Craft Beers",
    name: "Courtyard Pale Ale",
    description: "Our flagship pale ale with balanced citrus and pine notes. Dry-hopped for a bright finish.",
    price: 350,
    tags: ["5.2% ABV", "35 IBU", "Signature"]
  },
  {
    id: "m2",
    category: "Craft Beers",
    name: "Botanical Witbier",
    description: "A refreshing Belgian-style wheat beer brewed with coriander and fresh orange peel.",
    price: 320,
    tags: ["4.8% ABV", "15 IBU"]
  },
  {
    id: "m3",
    category: "Clay Oven",
    name: "Malai Chicken Tikka Platter",
    description: "Tender chicken marinated in cream, cardamom, and white pepper, char-grilled to perfection. Served with mint chutney.",
    price: 450,
    tags: ["Signature"]
  },
  {
    id: "m4",
    category: "Wood-Fired",
    name: "Wild Mushroom & Truffle Pizza",
    description: "Confit garlic base, mozzarella, assorted forest mushrooms, finished with truffle oil and fresh thyme.",
    price: 650,
    tags: ["Vegetarian"]
  },
  {
    id: "m5",
    category: "Grazing",
    name: "Loaded Lotus Stem Nachos",
    description: "Crispy lotus stem chips topped with pico de gallo, jalapeños, and our house-made cheese sauce.",
    price: 380,
    tags: ["Vegetarian"]
  },
  {
    id: "m6",
    category: "Desserts",
    name: "Stout Chocolate Fondant",
    description: "Warm molten chocolate cake infused with our Midnight Stout, served with vanilla bean ice cream.",
    price: 420,
  }
];
