import Layout from "../components/Layout";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import SellerDashboard from "../components/Dashboard/SellerDashboard";

import { useAuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, authLoading } = useAuthContext();

  if (authLoading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  } else {
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
      window.location.replace("/");
      return null;
    }
  }
};

export default Dashboard;
