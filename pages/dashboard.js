import { useRouter } from "next/router";

import Layout from "../components/Layout";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import SellerDashboard from "../components/Dashboard/SellerDashboard";

import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, setAuthLoading } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (!["ADMIN", "SELLER"].includes(user?.type)) {
        router.push("/");
      }
    }
  }, [user]);

  if (user?.type === "ADMIN") {
    return (
      <Layout>
        <AdminDashboard />
      </Layout>
    );
  } else if (user?.type === "SELLER") {
    return (
      <Layout>
        <SellerDashboard />
      </Layout>
    );
  } else {
    return null;
  }
};

export default Dashboard;
