import FoodCard from "../../components/Card/Food";
import Layout from "../../components/Layout";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { useRouter } from "next/router";
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Menu = () => {
  const { user, authLoading } = useAuthContext();
  const [page, setPage] = useState(1);
  const [type, setType] = useState("FOOD");
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      getMenu();
    }
  }, [id]);

  const getMenu = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/api/menu/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        toast.error(String(err), {
          duration: 4000,
          position: "top-center",
        });
      });
  };

  const editMenu = (data) => {
    const token = localStorage.getItem("token");
    axios
      .put(`${API_URL}/api/menu/${id}/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        toast.success("Menu berhasil diubah", {
          duration: 4000,
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.error(String(err), {
          duration: 4000,
          position: "top-center",
        });
      });
  };

  const deleteMenu = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${API_URL}/api/menu/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        toast.success("Menu berhasil dihapus", {
          duration: 4000,
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.error(String(err), {
          duration: 4000,
          position: "top-center",
        });
      });
  };

  const deleteClick = () => {
    deleteMenu();
    router.push("/menu");
  };

  const gantiPage = () => {
    setPage(2);
  };

  return (
    <Layout>
      {authLoading ? (
        <p>Loading...</p>
      ) : !!Object.keys(data).length &&
        !!Object.keys(user).length &&
        !!Object.keys(router.query).length ? (
        <div className="flex justify-center w-full">
          {page === 1 && (
            <div className="flex flex-col items-center gap-y-4">
              <h1 className="font-semibold text-4xl text-center">
                {data.name}
              </h1>
              <p className="font-semibold text-1xl text-center">
                {" "}
                Harga: {data.price}
              </p>
              <p className="font-semibold text-1xl text-center">
                {" "}
                Tipe Menu: {data.type}
              </p>
              <p className="font-semibold text-2xl text-center">
                Dijual Oleh: {data.seller.user.first_name}{" "}
                {data.seller.user.last_name}
              </p>
              <button
                className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
                onClick={() => gantiPage()}
              >
                {" "}
                Edit{" "}
              </button>
              <button
                className="bg-[#FF0000] hover:bg-[#800000] font-semibold text-white max-w-full w-[400px] h-[50px] rounded-md"
                onClick={() => deleteClick()}
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          )}
          {page === 2 && (
            <form
              onSubmit={handleSubmit(editMenu)}
              className="flex flex-col items-center gap-y-4 w-full px-4"
            >
              <p className="font-semibold text-2xl text-center mb-4">
                Edit {data.name}
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
                  id="type"
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
                className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
                onClick={() => editMenu()}
              >
                {" "}
                Edit {console.log(data)}
              </button>
            </form>
          )}
        </div>
      ) : (
        <p>Not Authorized</p>
      )}
    </Layout>
  );
};
export default Menu;
