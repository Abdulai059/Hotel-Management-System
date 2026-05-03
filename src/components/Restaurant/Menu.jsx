import { menu } from "../../data/menu";
import CartOverview from "./cart/CartOverview";
import MenuCard from "./ui/MenuCard";

export default function Menu() {
  return (
    <div className="min-h-screen bg-[#f5f2ee] px-8 py-10">
      {/* <CartOverview /> */}
      <div className="mx-auto grid max-w-full grid-cols-5 gap-x-6 gap-y-10">
        {menu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
