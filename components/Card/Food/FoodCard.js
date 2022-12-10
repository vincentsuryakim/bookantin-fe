import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../../constants/api";

const FoodCard = ({
  name = "Loading...",
  price = "Loading...",
  id = "#",
  path = "menu/",
  seller = "Loading...",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const url = `${API_URL}/api/menu/`;
  const urlCart = `${API_URL}/api/cart/add`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    var cartId = localStorage.getItem("cartId");
    if (cartId == null) {
      axios
        .get(urlCart, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("cartId", res.data.id);
          console.log(cartId);
        });
    }
  }, [url, urlCart]);

  const onSubmit = async (data) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    data.cart = localStorage.getItem("cartId");
    data.cartId = parseInt(data.cart);
    data.menuId = parseInt(data.menu);
    data.quantity = parseInt(data.quantity);
    var cek;

    if (data.quantity <= 0) {
      toast.error("input harus berupa bilangan bulat positif", {
        duration: 4000,
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    await axios
      .post(`${API_URL}/api/cart-content/get_by_MenuId_CartId/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((data) => {
        cek = true;
      })
      .catch((e) => {
        cek = false;
      });
    if (!cek) {
      axios
        .post(`${API_URL}/api/cart-content/`, data, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          toast.success("Add successful", {
            duration: 4000,
            position: "top-center",
          });
        })
        .catch((err) =>
          toast.error(err, {
            duration: 4000,
            position: "top-center",
          })
        )
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post(
          `${API_URL}/api/cart-content/add_quantity_by_cartId_menuId/`,
          data,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Add successful", {
            duration: 4000,
            position: "top-center",
          });
        })
        .catch((err) =>
          toast.error(err, {
            duration: 4000,
            position: "top-center",
          })
        )
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div key={id}>
      <div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
        <p className="leading-[1.5rem] line-clamp-2">{name}</p>
        <p className="mt-2.5 text-sm font-semibold leading-[1.2rem]">
          {" "}
          Rp{price}{" "}
        </p>
        <p className="mt-2.5 text-sm font-bold leading-[0.8 rem]">
          Seller: {seller.user.first_name} {seller.user.last_name}
        </p>
        <Popup
          trigger={
            <button
              className={`bg-green-500 font-semibold text-white max-w-full w-[400px] h-[50px]`}
            >
              Add
            </button>
          }
          position="center"
          contentStyle={{
            background: "white",
            margin: "auto",
            padding: "5 px",
          }}
          overlayStyle={{ background: "white", opacity: "30%" }}
          closeOnDocumentClick
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-4 w-full px-4"
          >
            <p className="font-semibold text-2xl text-center mb-4">
              Menu : {name}
            </p>
            <p className="font-semibold text-2xl text-center mb-4">
              Harga : {price}
            </p>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="quantity" className="mb-1">
                Quantity <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col max-w-full w-[400px]">
              <input
                type="hidden"
                id="menu"
                value={id}
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Menu"
                {...register("menu", { required: true })}
              />
              {errors.quantity && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              className={`bg-green-500 ${
                !loading && "hover:bg-green-700"
              } font-semibold text-white max-w-full w-[400px] h-[50px] rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "add"}
            </button>
          </form>
        </Popup>
      </div>
    </div>
  );
};

export default FoodCard;
