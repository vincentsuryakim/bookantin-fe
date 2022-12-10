import FoodCard from "../Card/Food/FoodCard";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import { toast } from "react-hot-toast";

const SellerDashboardGetMenu = () => {
  const [data, setData] = useState([]);
  const { user } = useAuthContext();

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
      });
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <p className="font-semibold text-2xl text-center pb-5">
        Melihat Menu Milik {user?.first_name} {user?.last_name}
      </p>
      <div className="flex justify-center flex-wrap gap-6 px-4">
        {data.map((data, index) => (
          <FoodCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default SellerDashboardGetMenu;
