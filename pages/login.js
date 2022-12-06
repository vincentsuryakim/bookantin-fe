import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/Layout";
import { API_URL } from "../constants/api";

const Login = () => {
  const [type, setType] = useState(null);
  const [page, setPage] = useState(1);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.type = type;

    setLoading(true);

    // axios
    //   .post(`${API_URL}/api/login`, data)
    //   .then(() => {
        
    // TODO: save token to local storage
    
    //     router.push("/");
    //   })
    //   .catch((err) => console.error(err))
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    
    <Layout>
      <div className="flex justify-center w-full">
        {page === 1 && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4">
            <p className="font-semibold text-2xl text-center">
              Login to BooKantin
            </p>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="username" className="mb-1">
                Username <span className="text-red-600">*</span>
              </label> 
              <input id="username" type="text" placeholder="Username" {...register("username", { required: true })} />
              {errors.username && <p className="text-red-500">Username is required</p>}
            </div>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="password" className="mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input id="password" type="password" placeholder="Password" {...register("password", { required: true })} />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
            <button className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md">
              Login
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Login;
