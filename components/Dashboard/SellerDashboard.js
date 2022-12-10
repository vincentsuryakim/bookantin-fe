import axios from "axios";
import FoodCard from "../../components/Card/Food";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { API_URL } from "../../constants/api";
import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";

const SellerDashboard = () => {
  const { user, authLoading } = useAuthContext();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (page === 3) {
      getSellerHistory();
    } else {
      getMenu();
    }
  }, [page]);

  const getMenu = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/api/menu`, {
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

  const getSellerHistory = () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/api/get-seller-history`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(String(err), {
          duration: 4000,
          position: "top-center",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const pad = (num, size) => {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    };

    return `${day} ${months[month]} ${year} ${pad(hours, 2)}:${pad(
      minutes,
      2
    )}:${pad(seconds, 2)}`;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <>
      <ul className="text-sm mb-4 font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow-md flex">
        <li className="w-full">
          <div
            className={`inline-block p-4 w-full ${
              page === 1
                ? "bg-gray-300 text-gray-900 active"
                : "bg-gray-100 text-gray-700 hover:text-gray-700 hover:bg-gray-200"
            } rounded-l-lg focus:ring-4 focus:ring-blue-300 focus:outline-none cursor-pointer`}
            onClick={() => {
              setLoading(true);
              setPage(1);
            }}
          >
            Your Menu
          </div>
        </li>
        <li className="w-full">
          <div
            className={`inline-block p-4 w-full ${
              page === 2
                ? "bg-gray-300 text-gray-900 active"
                : "bg-gray-100 text-gray-700 hover:text-gray-700 hover:bg-gray-200"
            } rounded-r-lg focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer`}
            onClick={() => {
              setLoading(true);
              setPage(3);
            }}
          >
            Your History
          </div>
        </li>
      </ul>

      {page === 1 && (
        <div className="flex flex-col items-center gap-y-4">
          <p className="font-semibold text-2xl text-center pb-5">
            Melihat Menu Milik {user?.first_name} {user?.last_name}
          </p>
          <div className="flex justify-center flex-wrap gap-6 px-4">
            {data.map((data, index) => (
              <FoodCard key={index} {...data} />
            ))}
          </div>
          <button
            className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
            onClick={() => setPage(2)}
          >
            {" "}
            Buat Menu Baru{" "}
          </button>
        </div>
      )}
      {page === 2 && (
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
      )}
      {page === 3 && (
        <>
          {loading && <p>Loading...</p>}
          {!loading && history && (
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Price
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Quantity
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Type
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Checkout Time
                    </th>
                  </tr>
                </thead>
                {history.map((item) => {
                  return (
                    <tbody key={item.id}>
                      <tr class="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.menu.name}
                        </th>
                        <td class="py-4 px-6">{item.menu.price}</td>
                        <td class="py-4 px-6">{item.quantity}</td>
                        <td class="py-4 px-6">
                          {capitalizeFirstLetter(item.menu.type)}
                        </td>
                        <td class="py-4 px-6">
                          {formatDate(item.cart.checkOutTime)}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SellerDashboard;
