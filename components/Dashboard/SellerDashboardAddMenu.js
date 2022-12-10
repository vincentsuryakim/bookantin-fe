import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_URL } from "../../constants/api";

const SellerDashboardAddMenu = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addMenu = (data) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .post(`${API_URL}/api/menu/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        toast.success("Berhasil menambahkan menu", {
          duration: 4000,
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.error(String(err), {
          duration: 4000,
          position: "top-center",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(addMenu)}
      className="flex flex-col items-center gap-y-4 w-full px-4"
    >
      <p className="font-semibold text-2xl text-center mb-4">
        Tambahkan Makanan Baru
      </p>
      <div className="flex flex-col max-w-full w-[400px]">
        <label for="name" className="mb-1">
          Nama Makanan <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
          placeholder="Tuliskan Nama Makanan"
          {...register("name", { required: true })}
        />
        {errors.first_name && (
          <span className="font-semibold text-red-500 text-sm">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col max-w-full w-[400px]">
        <label for="price" className="mb-1">
          Harga Makanan <span className="text-red-600">*</span>
        </label>
        <input
          id="price"
          className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
          placeholder="Harga Makanan"
          {...register("price", { required: true })}
        />
        {errors.last_name && (
          <span className="font-semibold text-red-500 text-sm">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col max-w-full w-[400px]">
        <label for="type" className="mb-1">
          Tipe <span className="text-red-600">*</span>
        </label>
        <input
          id="price"
          className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
          placeholder="Isi dengan FOOD/DRINK"
          {...register("type", { required: true })}
        />
        {errors.last_name && (
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
      >
        {loading ? "Loading..." : "Add Menu"}
      </button>
    </form>
  );
};

export default SellerDashboardAddMenu;
