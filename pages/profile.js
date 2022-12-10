import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";
import { API_URL } from "../constants/api";

const Profile = () => {
  const [type] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.type = type;
    data.user = user;

    setLoading(true);

    const token = localStorage.getItem("token");

    axios
      .put(
        `${API_URL}/api/update_user_data`,
        {
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(true);
        toast.success("Update successful", {
          duration: 4000,
          position: "top-center",
        });
        window.location.reload();
        window.location.href = "/";
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
          className="flex flex-col items-center gap-y-4 w-full px-4"
        >
          <p className="font-semibold text-2xl text-center mb-4">
            Update Profile
          </p>
          <div className="flex flex-col max-w-full w-[400px]">
            <label htmlFor="first_name" className="mb-1">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              id="first_name"
              defaultValue={user?.first_name}
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
            <label htmlFor="last_name" className="mb-1">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              id="last_name"
              defaultValue={user?.last_name}
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
            <label htmlFor="username" className="mb-1">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              defaultValue={user?.username}
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
            <label htmlFor="email" className="mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              defaultValue={user?.email}
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
          <button
            className={`bg-green-500 ${
              !loading && "hover:bg-green-700"
            } font-semibold text-white max-w-full w-[400px] h-[50px] rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
