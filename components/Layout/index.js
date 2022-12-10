import Navbar from "../Navbar";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-[1440px] mx-4">{children}</div>
    </div>
  </>
);

export default Layout;
