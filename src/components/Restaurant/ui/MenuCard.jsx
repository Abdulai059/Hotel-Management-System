import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

export default function MenuCard({ item }) {
  const { id, name, price, tagline, ingredients, img } = item;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddCart() {
    const newItem = {
      menuId: id,
      name,
      quantity: 1,
      unitPrice: price,
      totalPrice: price,
    };

    dispatch(addItem(newItem));
  }

  return (
    <article className="group p-2">
      <div className="mb-3 aspect-square w-full overflow-hidden rounded-xl">
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[12px] font-bold tracking-widest text-stone-900 uppercase">{name}</span>

        <span className="text-base font-semibold text-stone-900">
          GH₵ <span className="text-3xl">{price}</span>
        </span>
      </div>

      <p className="mb-2 text-[8px] tracking-widest text-stone-400 uppercase">{tagline}</p>

      <div className="mb-2 border-t border-stone-300" />

      <p className="mb-3 text-[8px] leading-relaxed tracking-wider text-stone-400 uppercase">
        {ingredients.join(" / ")}
      </p>

      {isInCart ? (
        <UpdateItemQuantity menuId={id} currentQuantity={currentQuantity} />
      ) : (
        <button
          onClick={handleAddCart}
          className="w-32 rounded-full bg-[#e7f68f] px-4 py-2 text-xs font-medium text-gray-900 md:px-5 md:py-2.5"
        >
          ADD TO CART
        </button>
      )}
    </article>
  );
}
