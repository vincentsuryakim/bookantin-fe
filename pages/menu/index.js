import FoodCard from "../components/Card/Food";
import Layout from "../components/Layout";
import axios from "axios";
import { API_URL } from "../constants/api";
import { useRouter } from "next/router";
import { dummyData } from "../constants/foodDummyData";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

    const getMenu = () => {
        const token = localStorage.getItem("token");
        axios.get(`${API_URL}/api/menu`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            const data = res.data;

        })
        .catch((err) => {
            toast.error(String(err), {
                duration: 4000,
                position: "top-center",
            });
        })
    return (
        <Layout>
            <div className="flex justify-center flex-wrap gap-6 px-4">
                {data.map((data, index) => (
                    <FoodCard key={index} {...data} />
                )}
                </div>
        </Layout>
    );
};

export default Menu;
