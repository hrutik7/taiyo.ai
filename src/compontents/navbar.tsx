import React from "react";
import { useRecoilValue } from "recoil";
import { routestate } from "../atom/routeatom";

const Navbar: React.FC = () => {
  const routevalue = useRecoilValue(routestate);
  return (
    <div className="h-16 w-[100%] border p-5 bg-white text-gray-900 text-center  px-4">
      <h1 className="text-xl font-bold">{routevalue} page</h1>
    </div>
  );
};

export default Navbar;
