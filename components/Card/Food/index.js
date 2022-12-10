const FoodCard = ({
  name = "Loading...",
  price = "Loading...",
  id = "#",
  path = "menu/",
  seller = "Loading...",
  link = "#",
}) => (
  <a href={path.concat(id)}>
    <div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
      <p className="leading-[1.5rem] line-clamp-2">{name}</p>
      <p className="mt-2.5 text-sm font-semibold leading-[1.2rem]"> Rp{price} </p>
      <p className="mt-2.5 text-sm font-bold leading-[0.8 rem]">Seller: {seller.user.first_name} {seller.user.last_name}</p>
    </div>
  </a>
);

export default FoodCard;
