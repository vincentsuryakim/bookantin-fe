import { useRouter } from "next/router";
const FoodCard = ({
  router = useRouter(),
  name = "Loading...",
  price = "Loading...",
  id = "#",
  path = "menu/",
}) => (
  (path = "menu/" + id),
  (
    <div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
      <p className="font-semibold leading-[1.375rem] line-clamp-2">{name}</p>
      <p className="mt-2.5 text-sm font-semibold leading-[1.188rem]">{price}</p>
      <button
        className={`bg-green-500 font-semibold text-white max-w-full w-[160px] h-[40px] rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed margin-auto mt-4`}
        onClick={() => router.push(path)}
      >
        Edit/Delete Menu
      </button>
    </div>
  )
);

export default FoodCard;
