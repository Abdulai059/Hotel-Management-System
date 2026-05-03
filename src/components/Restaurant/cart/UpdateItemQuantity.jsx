import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ menuId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => dispatch(decreaseItemQuantity(menuId))}
        disabled={currentQuantity === 0}
        className="h-8 w-8 rounded-full bg-stone-200 text-lg font-bold hover:bg-stone-300 disabled:opacity-40"
      >
        -
      </button>

      <span className="min-w-8 text-center text-sm font-semibold">{currentQuantity}</span>

      <button
        onClick={() => dispatch(increaseItemQuantity(menuId))}
        className="h-8 w-8 rounded-full bg-stone-900 text-lg font-bold text-white hover:bg-stone-700"
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
