import React, { ReactNode } from "react";
import Sidebar from "./compontents/sidebar";
import Navbar from "./compontents/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot, useRecoilValue } from "recoil";
import { routestate } from "./atom/routeatom";
import Contactpage from "./compontents/contactpage";
import Graphpage from "./compontents/graphpage";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

// Layout component with children prop
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC = () => {
  const routeValue = useRecoilValue(routestate);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        {/* <div className="flex-1 justify-center flex flex-col">
          <main className="p-6 flex-1">{children}</main>
          dkdnsk
        </div> */}
        {routeValue === "contact" ? (
          <div className="w-[100%] flex justify-center text-center">
            <Contactpage />
          </div>
        ) : (
          <div className=" w-[100%]">
            <Graphpage />
          </div>
        )}
      </div>
    </div>
  );
};

// App component
const App: React.FC = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
