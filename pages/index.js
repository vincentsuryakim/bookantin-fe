import FoodCard from "../components/Card/Food";
import Layout from "../components/Layout";
("axios");

import { dummyData } from "../constants/foodDummyData";

const Home = () => {
  return (
    <Layout>
      <div className="flex justify-center flex-wrap gap-6 px-4">
        {dummyData.map((data, index) => (
          <FoodCard key={index} {...data} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
