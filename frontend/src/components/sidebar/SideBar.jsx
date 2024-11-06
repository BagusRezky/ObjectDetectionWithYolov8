import { IconAd, IconLayoutDashboard, IconReport } from '@tabler/icons-react';
import { Link, NavLink } from "react-router-dom"; // Make sure to install react-router-dom if using links
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <div className="min-h-svh min-w-[240px] fixed bg-navy hidden sm:flex sm:flex-col sm:gap-5">
      <div className="p-4 h-[88px] bg-red">
        <h1 className="font-inter-tight text-white text-3xl italic font-extrabold">AIDA</h1>
      </div>
      <ul className="mx-3 flex flex-col gap-2">
        <li>
          <NavLink
            to="/overview"
            className={({ isActive }) =>
              `flex gap-1 items-center h-10 px-3 rounded-lg text-white  ${isActive ? 'bg-red' : 'hover:bg-white hover:bg-opacity-5'}`
            }
          >
            <IconLayoutDashboard stroke={2} size={20} />
            <span className="text-base font-medium font-inter-tight">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/all-billboard"
            className={({ isActive }) =>
              `flex gap-1 items-center h-10 px-3 rounded-lg text-white  ${isActive ? 'bg-red' : 'hover:bg-white hover:bg-opacity-5'}`
            }
          >
            <IconAd stroke={2} size={20} />
            <span className="text-base font-medium font-inter-tight">Billboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `flex gap-1 items-center h-10 px-3 rounded-lg text-white  ${isActive ? 'bg-red' : 'hover:bg-white hover:bg-opacity-5'}`
            }
          >
            <IconReport stroke={2} size={20} />
            <span className="text-base font-medium font-inter-tight">Report</span>
          </NavLink>
        </li>
      </ul>

    </div>
  );
}



export default Sidebar;
