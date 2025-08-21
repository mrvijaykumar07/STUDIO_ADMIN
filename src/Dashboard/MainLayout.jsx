import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-4 mt-4 md:ml-64">
          {/* mt-4 => Navbar ke baad gap */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
