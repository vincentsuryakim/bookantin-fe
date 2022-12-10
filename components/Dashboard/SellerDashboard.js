import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { API_URL } from "../../constants/api";

import SellerDashboardAddMenu from "./SellerDashboardAddMenu";
import SellerDashboardGetMenu from "./SellerDashboardGetMenu";

const SellerDashboard = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (page === 2) {
      getSellerHistory();
    }
  }, [page]);

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
            } focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer`}
            onClick={() => {
              setLoading(true);
              setPage(2);
            }}
          >
            Add Menu
          </div>
        </li>
        <li className="w-full">
          <div
            className={`inline-block p-4 w-full ${
              page === 3
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

      {page === 1 && <SellerDashboardGetMenu />}
      {page === 2 && <SellerDashboardAddMenu />}
      {page === 3 && (
        <>
          {loading && <p>Loading Seller History...</p>}
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
