import axios from "axios";
import { API_URL } from "../../constants/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminDashboardTable from "./AdminDashboardTable";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(true);

  useEffect(() => {
    if (triggerReload) {
      getSellerAll();
    }
  }, [triggerReload]);

  const getSellerAll = () => {
    const token = localStorage.getItem("token");

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
        setTriggerReload(false);
      });
  };

  return (
    <div className="flex justify-center w-full">
      {(loading || triggerReload) && <p>Loading...</p>}
      {!loading && !triggerReload && (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          {data &&
            data.map((seller) => (
              <AdminDashboardTable
                key={seller.id}
                seller={seller}
                setTriggerReload={setTriggerReload}
              />
            ))}
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
