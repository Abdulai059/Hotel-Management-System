const MENU = [
  {
    id: 1,
    name: "Jollof Rice & Chicken",
    price: 45,
    tagline: "Smoky tomato rice with grilled chicken",
    ingredients: ["Rice", "Tomato stew", "Chicken", "Spices"],
    img: "https://images.unsplash.com/photo-1604908176997-431c9b6c3f7b?w=400&q=80",
  },
  {
    id: 2,
    name: "Banku & Tilapia",
    price: 60,
    tagline: "Fermented corn dough with grilled tilapia",
    ingredients: ["Banku", "Tilapia", "Pepper sauce", "Onions"],
    img: "https://images.unsplash.com/photo-1625943555419-56a2cb596640?w=400&q=80",
  },
  {
    id: 3,
    name: "Fufu & Light Soup",
    price: 55,
    tagline: "Soft cassava dough with rich soup",
    ingredients: ["Fufu", "Goat meat", "Light soup", "Spices"],
    img: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&q=80",
  },
  {
    id: 4,
    name: "Waakye Special",
    price: 40,
    tagline: "Rice & beans served with sides",
    ingredients: ["Rice", "Beans", "Spaghetti", "Egg", "Shito"],
    img: "https://images.unsplash.com/photo-1625944525903-bd9f0a8f3593?w=400&q=80",
  },
  {
    id: 5,
    name: "Kenkey & Fish",
    price: 35,
    tagline: "Fermented maize with fried fish",
    ingredients: ["Kenkey", "Fish", "Pepper", "Shito"],
    img: "https://images.unsplash.com/photo-1613145997970-db84a7975fbb?w=400&q=80",
  },
  {
    id: 6,
    name: "Fried Rice & Chicken",
    price: 50,
    tagline: "Savory fried rice with crispy chicken",
    ingredients: ["Rice", "Chicken", "Vegetables", "Egg"],
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
  },
];

function PizzaCard({ name, price, tagline, ingredients, img }) {
  return (
    <article className="group">
      <div className="mb-3 aspect-square w-full overflow-hidden">
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[11px] font-bold tracking-widest text-stone-900 uppercase">{name}</span>
        <span className="text-[11px] font-bold text-stone-900">GH₵ {price}</span>
      </div>

      <p className="mb-2 text-[8px] tracking-widest text-stone-400 uppercase">{tagline}</p>

      <div className="mb-2 border-t border-stone-300" />

      <p className="text-[8px] leading-relaxed tracking-wider text-stone-400 uppercase">{ingredients.join(" / ")}</p>
    </article>
  );
}

export default function Menu() {
  return (
    <div className="min-h-screen bg-[#f5f2ee] px-8 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-x-6 gap-y-10">
        {MENU.map((pizza) => (
          <PizzaCard key={pizza.id} {...pizza} />
        ))}
      </div>
    </div>
  );
}
