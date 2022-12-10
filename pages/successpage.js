import Layout from "../components/Layout";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/api";

const SuccessPage = () => {
  useEffect(() => {
    var cartId = localStorage.getItem("cartId");
    const token = localStorage.getItem("token");
    if (cartId != null) {
      axios.get(`${API_URL}/api/cart/` + cartId + "/set_checkout_true_by_id", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      var data = {
        id: cartId,
        status: "diproses",
      };
      axios.post(`${API_URL}/api/cart/update_status_by_id/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      localStorage.removeItem("cartId");
    }
  }, []);
  return (
    <Layout>
      <p className="font-semibold text-2xl text-center mb-4">
        Pembayaran Berhasil
      </p>
    </Layout>
  );
};

export default SuccessPage;
