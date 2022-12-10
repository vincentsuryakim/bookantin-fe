import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const GetCart = () => {
  const url = `${API_URL}/api/cart/`;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (cartId != null) {
      setLoading(true);
      axios
        .get(url + cartId, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setList([res.data]);
        })
        .finally(setLoading(false))
        .catch(() => {
          toast.error("Pesanan tidak ditemukan", {
            duration: 4000,
            position: "top-center",
          });
          setLoading(false);
        });
    }
  }, [cartId]);

  const onSubmit = async (data) => {
    setCartId(data.cart);
  };

  const cards = list.map((item, idx) => {
    return (
      <div key={idx}>
        <div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
          <p className="font-semibold leading-[1.375rem] line-clamp-2">
            Id Pesanan : {item.id}
          </p>
          <p className="mt-2.5 text-sm font-semibold leading-[1.188rem]">
            Status : {item.status}
          </p>
          <p className="mt-2.5 text-sm font-semibold leading-[1.188rem]">
            Waktu Pemesanan : {item.checkOutTime}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div style={{ margin: "1rem" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-y-4 w-full px-4"
      >
        <p className="font-semibold text-2xl text-center mb-4">
          Masukkan id pesanan
        </p>
        <div className="flex flex-col max-w-full w-[400px]">
          <label for="cart" className="mb-1">
            Id Pesanan <span className="text-red-600">*</span>
          </label>
          <input
            id="cart"
            className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
            placeholder="id pesanan"
            {...register("cart", { required: true })}
          />
          {errors.cart && (
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
          {loading ? "Loading..." : "Add"}
        </button>
      </form>
      <div className="flex justify-center flex-wrap gap-6 px-4">{cards}</div>
    </div>
  );
};

const OrderStatus = () => {
  return (
    <Layout>
      <GetCart />
    </Layout>
  );
};

export default OrderStatus;
