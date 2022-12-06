import FoodCard from "../../components/Card/Food";
import Layout from "../../components/Layout";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { useRouter } from "next/router";
import { dummyData } from "../../constants/foodDummyData";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

const Menu = () => {
  const { user, authLoading } = useAuthContext();
  const [data, setData] = useState([]);
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
      });
  };

  return (
    <Layout>
      {authLoading ? (
        <p>Loading...</p>
      ) : !!Object.keys(user ?? {}).length ? (
        <>
          <p className="font-semibold text-2xl text-center pb-5">
            Melihat Menu Milik {user?.first_name} {user?.last_name}
          </p>
          <div className="flex justify-center flex-wrap gap-6 px-4">
            {data.map((data, index) => (
              <FoodCard key={index} {...data} />
            ))}
          </div>
        </>
      ) : (
        <p className="font-semibold text-2xl text-center">Anda belum login</p>
      )}
    </Layout>
  );
};
export default Menu;
