import axios from "axios";
import { API_URL } from "../../constants/api";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [dataSeller, setDataSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useAuthContext();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/sellerall/`, {
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
      .finally(() => {
        setLoading(false);
      });
  }, [data]);

  function verifiedSeller(sellerId) {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .put(`${API_URL}/api/sellerall/${sellerId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setDataSeller(res.data);
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
      .then((res) => {
        setData(res.data);
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
    <div className="flex justify-center w-full">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        {Array.isArray(data) &&
          data.map((seller) => (
            <tbody key={seller.id}>
              <tr>
                <td className="border px-4 py-2">
                  {seller.user.first_name} {seller.user.last_name}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className={
                      seller.verified
                        ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 opacity-50 cursor-not-allowed"
                        : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    }
                    disabled={seller.verified}
                    onClick={() => verifiedSeller()}
                  >
                    Verify
                  </button>
                  <button
                    className={`focus:outline-none text-white bg-red-700 ${
                      !loading && "hover:bg-red-800"
                    } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
                    onClick={() => deleteSeller(seller.id)}
                  >
                    {loading ? "Loading...." : "Delete"}
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default AdminDashboard;
