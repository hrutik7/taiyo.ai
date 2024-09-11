import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { routestate } from "../atom/routeatom";
const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Contacts");
  const [routeActive, setRouteActive] = useRecoilState(routestate);
  const menuItems = ["contact", "Charts and maps"];

  return (
    <div className="w-64 px-5  border font-sans h-screen bg-white text-gray-900">
      <div className="p-4 text-xl font-bold"></div>
      <ul className="mt-6 flex flex-col gap-5">
        {menuItems.map((item) => (
          <li
            key={item}
            className={`px-4 py-5  cursor-pointer transition-colors ease-in-out delay-200 rounded-md ${
              activeItem === item
                ? "bg-gray-700 text-white font-bold"
                : "hover:bg-gray-100 hover:text-black hover:font-bold"
            }`}
            onClick={() => {
              setRouteActive(item);
              setActiveItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
