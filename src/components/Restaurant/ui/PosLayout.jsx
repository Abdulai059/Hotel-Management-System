import CartPanel from "../cart/CartPanel";
import Categories from "../cart/Categories";
import Menu from "../Menu";

export default function PosLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="no-scrollbar w-1/10 overflow-y-auto border-r p-3">
        <Categories />
      </div>

      <div className="no-scrollbar w-4/6 overflow-y-auto p-4">
        <Menu />
      </div>

      <div className="w-1/4 border-l p-4">
        <CartPanel />
      </div>
    </div>
  );
}
