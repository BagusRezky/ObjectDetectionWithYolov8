import { useState } from 'react';
import { IconAd, IconArrowBack, IconArrowBackUp, IconLayoutDashboard, IconMenu, IconMenu2, IconReport } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function TopBar({ title }) {
    // State to manage the visibility of the hamburger menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex items-center justify-between px-4 h-[88px] w-full bg-white border-b border-slate-200 fixed text-neutral-black z-30">
            <h2 className="font-inter-tight font-medium text-2xl">{title}</h2>

            {/* Icon to toggle the hamburger menu */}
            <button onClick={toggleMenu} className="md:hidden">
                <IconMenu2 size={24} stroke={2} color="#1b1b1b" />
            </button>

            {/* Hamburger menu content */}
            {isMenuOpen && (
                <div className="absolute left-0 top-0 w-svw min-h-svh bg-navy flex flex-col gap-4 md:hidden">
                    <div className="p-4 h-[88px] bg-red">
                        <h1 className="font-inter-tight text-white text-3xl italic font-extrabold">AIDA</h1>
                    </div>
                    <ul className="mx-3 flex flex-col gap-2">
                        <li>
                            <NavLink to="/overview"
                                className={({ isActive }) =>
                                    `flex gap-1 items-center h-10 px-3 rounded-lg text-white  ${isActive ? 'bg-red' : 'hover:bg-white hover:bg-opacity-5'}`
                                }>
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
                        <li>
                            <button onClick={toggleMenu} className='flex gap-1 w-full items-center h-10 px-3 rounded-lg hover:bg-white hover:bg-opacity-5 text-white'>
                                <IconArrowBackUp stroke={2} size={20} />

                                <span className="text-base font-medium font-inter-tight">Back</span>
                            </button>
                        </li>
                    </ul>
                    {/* 
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
                    </ul> */}
                </div>
            )}
        </div>
    );
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TopBar;
