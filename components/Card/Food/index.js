const FoodCard = ({
  name = "Loading...",
  price = "Loading...",
  link = "#",
}) => (
  <a href={link}>
    <div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
      <p className="font-semibold leading-[1.375rem] line-clamp-2">{name}</p>
      <p className="mt-2.5 text-sm font-semibold leading-[1.188rem]">{price}</p>
    </div>
  </a>
);
export default FoodCard;
