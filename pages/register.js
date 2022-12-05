import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/Layout";
import { API_URL } from "../constants/api";

const Register = () => {
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
    //   .post(`${API_URL}/api/register`, data)
    //   .then(() => {
    //     router.push("/login");
    //   })
    //   .catch((err) => console.error(err))
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const handleChooseType = (type) => {
    setType(type);
    setPage(2);
  };

  return (
    <Layout>
      <div className="flex justify-center w-full">
        {page === 1 && (
          <div className="flex flex-col items-center gap-y-4">
            <p className="font-semibold text-2xl text-center">
              Choose your Account Type
            </p>
            <button
              className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
              onClick={() => handleChooseType("CUSTOMER")}
            >
              Customer
            </button>
            <button
              className="bg-[#e8e8e8] hover:bg-[#e0e0e0] font-semibold text-black max-w-full w-[400px] h-[50px] rounded-md"
              onClick={() => handleChooseType("SELLER")}
            >
              Seller
            </button>
          </div>
        )}
        {page === 2 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-4 w-full px-4"
          >
            <p className="font-semibold text-2xl text-center mb-4">
              Register as {type.charAt(0) + type.slice(1).toLowerCase()}
            </p>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="first_name" className="mb-1">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                id="first_name"
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="First Name"
                {...register("first_name", { required: true })}
              />
              {errors.first_name && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="last_name" className="mb-1">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                id="last_name"
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Last Name"
                {...register("last_name", { required: true })}
              />
              {errors.last_name && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="username" className="mb-1">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                id="username"
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="email" className="mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="password" className="mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 font-semibold text-white max-w-full w-[400px] h-[50px] rounded-md"
              type="submit"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Register;
