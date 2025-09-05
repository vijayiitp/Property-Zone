import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 container mx-auto mt-18">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
