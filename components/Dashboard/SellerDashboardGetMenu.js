import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const SellerDashboardGetMenu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    getMenu();
  }, []);

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
      })
      .finally(() => setLoading(false));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  if (loading) {
    return <p>Loading Your Menu...</p>;
  } else {
    return (
      <>
        <p className="font-semibold text-2xl text-center mb-5">
          Melihat Menu Milik {user?.first_name} {user?.last_name}
        </p>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Type
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            {data.map((item) => {
              return (
                <tbody key={item.id}>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.name}
                    </th>
                    <td className="py-4 px-6">{item.price}</td>
                    <td className="py-4 px-6">
                      {capitalizeFirstLetter(item.type)}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className={`bg-blue-500 hover:bg-blue-600 font-semibold text-white max-w-full w-[160px] h-[40px] rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed margin-auto mt-4`}
                        onClick={() => router.push(`menu/${item.id}`)}
                      >
                        Edit/Delete Menu
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </>
    );
  }
};

export default SellerDashboardGetMenu;
