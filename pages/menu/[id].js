import FoodCard from "../../components/Card/Food";
import Layout from "../../components/Layout";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { useRouter } from "next/router";
import { dummyData } from "../../constants/foodDummyData";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Router, Route, useParams, useSearchParams} from "react-router-dom";
import toast from "react-hot-toast";

const Menu = () => {

  const { user, authLoading } = useAuthContext();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    getMenu();
  }, [router.isReady]);

  const getMenu = () => {
    //get id from url param
    const id = window.location.pathname.split("/")[2];
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/api/menu/${id}`, {
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

  const editMenu = () => {
    const id = window.location.pathname.split("/")[2];
    const token = localStorage.getItem("token");
    axios.put(`${API_URL}/api/menu/${id}`, {
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

  const deleteMenu = () => {
    const id = window.location.pathname.split("/")[2];
    const token = localStorage.getItem("token");
    axios.delete(`${API_URL}/api/menu/${id}`, {
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
      <div className="flex justify-center w-full">
        {page === 1 && (
          <div className="flex flex-col items-center gap-y-4">
            <h1>{data.name}</h1>
            <p className="font-semibold text-2xl text-center"> {data.price}</p>
            <p className="font-semibold text-2xl text-center"> {data.type}</p>
            <p className="font-semibold text-2xl text-center"> {data.seller}</p>
            <button className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
              onClick={() => deleteMenu()}
            > Delete </button>
            <button className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
              onClick={() => editMenu()}
            > Edit </button>
          </div>
        )} 
        {page === 2 && (
          <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-y-4 w-full px-4"
        >
          <p className="font-semibold text-2xl text-center mb-4">
            Edit {data.name}
          </p>
          <div className="flex flex-col max-w-full w-[400px]">
            <label for="name" className="mb-1">
              Nama Makanan <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
              placeholder="Tuliskan Nama Makanan"
              {...register("name", { required: true })}
            />
            {errors.first_name && (
              <span className="font-semibold text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col max-w-full w-[400px]">
            <label for="price" className="mb-1">
              Harga Makanan <span className="text-red-600">*</span>
            </label>
            <input
              id="price"
              className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
              placeholder="Harga Makanan"
              {...register("price", { required: true })}
            />
            {errors.last_name && (
              <span className="font-semibold text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col max-w-full w-[400px]">
            <label for="type" className="mb-1">
              Tipe Makanan <span className="text-red-600">*</span>
            </label>
            </div>
            <div onChange={this.onChangeValue}>
            <input type="radio" id="type" value="DRINK" {...register("username", { required: true })} />
            <label for="type">DRINK</label>
            <input type="radio" id="type" value="FOOD" {...register("username",
            { required: true })} />
            <label for="type">FOOD</label>
            </div>
            <button className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
              onClick={() => editMenu()}
            > Edit </button>
          </form>
        )
          }
      </div>
    </Layout>
  );
};
export default Menu;
