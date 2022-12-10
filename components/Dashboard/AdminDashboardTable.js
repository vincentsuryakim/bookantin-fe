import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/api";
import toast from "react-hot-toast";

const AdminDashboardTable = ({ seller, setTriggerReload }) => {
  const [loading, setLoading] = useState(false);

  function verifiedSeller(sellerId) {
    setLoading(true);

    const token = localStorage.getItem("token");

    axios
      .post(
        `${API_URL}/api/sellerall/`,
        {
          id: sellerId,
          verified: true,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        setTriggerReload(true);
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
  }

  function deleteSeller(sellerId) {
    setLoading(true);

    const token = localStorage.getItem("token");

    axios
      .delete(`${API_URL}/api/sellerall/${sellerId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setTriggerReload(true);
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
  }

  return (
    <tbody key={seller.id}>
      <tr>
        <td className="border px-4 py-2">
          {seller.user.first_name} {seller.user.last_name}
        </td>
        <td className="border px-4 py-2">
          <button
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
              seller.verified && "opacity-50 cursor-not-allowed"
            }`}
            disabled={seller.verified}
            onClick={() => verifiedSeller(seller.id)}
          >
            {loading ? "Loading...." : seller.verified ? "Verified" : "Verify"}
          </button>
          <button
            className={`focus:outline-none text-white bg-red-700 ${
              !loading && "hover:bg-red-800"
            } ${
              loading && "opacity-50 cursor-not-allowed"
            } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
            onClick={() => deleteSeller(seller.id)}
            disabled={loading}
          >
            {loading ? "Loading...." : "Delete"}
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default AdminDashboardTable;
