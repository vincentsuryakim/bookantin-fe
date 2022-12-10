import FoodCard from "../components/Card/Food/FoodCard";
import Layout from "../components/Layout";

import { dummyData } from "../constants/foodDummyData";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../constants/api";
import MenuList from "../components/Card/Food/MenuList";
import axios from "axios";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/api/menu`)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="flex justify-center flex-wrap gap-6 px-4">
          <MenuList menus={menus} />
        </div>
      </Layout>
    );
  }
};

export default Home;
