import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import Layout from "../components/Layout";
import { API_URL } from "../constants/api";

import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { setAuthLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post(`${API_URL}/api/login`, data)
      .then((res) => {
        const data = res.data;
        const token = data?.token;

        if (!!token) {
          localStorage.setItem("token", token);

          toast.success("Login successful", {
            duration: 4000,
            position: "top-center",
          });

          setAuthLoading(true);

          router.push("/menu");
        } else {
          toast.error("Login failed. Please try again.", {
            duration: 4000,
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        toast.error(String(err), {
          duration: 4000,
          position: "top-center",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-y-4"
        >
          <p className="font-semibold text-2xl text-center">
            Login to BooKantin
          </p>
          <div className="flex flex-col max-w-full w-[400px]">
            <label for="username" className="mb-1">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
          <div className="flex flex-col max-w-full w-[400px]">
            <label for="password" className="mb-1">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <button
            className={`bg-green-500 ${
              !loading && "hover:bg-green-700"
            } font-semibold text-white max-w-full w-[400px] h-[50px] rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
