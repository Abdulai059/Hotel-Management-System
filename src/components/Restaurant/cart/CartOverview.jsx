import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "@/utils/helpers";

function CartOverview() {
  const totalCardQuantity = useSelector(getTotalCartQuantity);

  const totalCardPrice = useSelector(getTotalCartPrice);

  if (!totalCardQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="text-stone-30 space-x-4 font-semibold sm:space-x-6">
        <span>{totalCardQuantity} pizzas</span>
        <span>{formatCurrency(totalCardPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
