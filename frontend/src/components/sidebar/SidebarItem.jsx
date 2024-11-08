import { IconCircle } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

function SidebarItem({ icon: Icon, title, link }) {
    return (
        <NavLink
            to={link} // Use the provided link prop
            className={({ isActive }) =>
                `flex gap-1 items-center h-12 px-3 rounded-lg text-white ${isActive ? 'bg-red-500' : ''}` // Ensure to use valid Tailwind color classes
            }
        >
            {Icon ? Icon : <IconCircle stroke={2} />} {/* Render the icon component */}
            <span className="text-base font-medium font-inter-tight">{title}</span> {/* Use the title prop */}
        </NavLink>
    );
}

export default SidebarItem;
