import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#F1F2F4] text-[#25272B]">

      <div className="flex h-full min-h-0">

        {/* ======================================
            MAIN SIDEBAR
        ====================================== */}

        <Sidebar />

        {/* ======================================
            MAIN CONTENT
        ====================================== */}

        <div className="flex-1 min-w-0 min-h-0 h-full flex flex-col">

          {/* ====================================
              NAVBAR
          ==================================== */}

          <div className="shrink-0">
            <Navbar />
          </div>

          {/* ====================================
              PAGE CONTENT
              THIS AREA WILL SCROLL
          ==================================== */}

          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-[#F1F2F4]">

            <div className="p-6 min-h-full">
              <Outlet />
            </div>

          </main>

        </div>

      </div>

    </div>
  );
}