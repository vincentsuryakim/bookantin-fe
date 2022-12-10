import Layout from "../components/Layout";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import SellerDashboard from "../components/Dashboard/SellerDashboard";

import { useAuthContext } from "../contexts/AuthContext";
import { SEO } from "../lib/seo";

const Dashboard = () => {
  const { user, authLoading } = useAuthContext();

  if (authLoading) {
    return (
      <>
        <SEO title="Dashboard" />
        <Layout>
          <p>Loading...</p>
        </Layout>
      </>
    );
  } else {
    if (user?.type === "ADMIN") {
      return (
        <>
          <SEO title="Dashboard Admin" />
          <Layout>
            <AdminDashboard />
          </Layout>
        </>
      );
    } else if (user?.type === "SELLER") {
      return (
        <>
          <SEO title="Dashboard Seller" />
          <Layout>
            <SellerDashboard />
          </Layout>
        </>
      );
    } else {
      window.location.replace("/");
      return null;
    }
  }
};

export default Dashboard;
