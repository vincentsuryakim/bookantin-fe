import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import { API_URL } from "../../constants/api";

import { useAuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, authLoading } = useAuthContext();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    setLogoutLoading(true);

    const token = localStorage.getItem("token");

    axios
      .post(
        `${API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");

        toast.success("Logout successful", {
          duration: 4000,
          position: "top-center",
        });

        window.location.reload();
      })
      .catch((err) => {
        toast.error("Logout failed. Please try again.", {
          duration: 4000,
          position: "top-center",
        });
      })
      .finally(() => setLogoutLoading(false));
  };

  return (
    <nav className="w-full flex justify-center shadow-lg">
      <div className="w-full max-w-[1440px] flex justify-between items-center p-4">
        <div>
          <p className="font-bold">
            <Link href="/">BooKantin</Link>
          </p>
        </div>
        {authLoading ? (
          <p>Loading...</p>
        ) : !!Object.keys(user ?? {}).length ? (
          <div className="flex gap-x-4 items-center">
            <p>Hello, {user?.first_name}!</p>

            <button
              className={`bg-red-500 ${
                !logoutLoading && "hover:bg-red-700"
              } text-white font-semibold py-2 px-4 rounded`}
              onClick={() => handleLogout()}
              disabled={logoutLoading}
            >
              {logoutLoading ? "Loading...." : "Logout"}
            </button>
            <Link href="/PaymentPage">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              payment
              </button>
            </Link>
            <Link href="/Order">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              order
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
