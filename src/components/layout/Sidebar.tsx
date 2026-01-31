'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { routes } from '@/utills/route';

interface SidebarProps {
    isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
    const [collapsed, setCollapsed] = useState(!isOpen);

    const menuItems = routes.map((route) => ({
        label: route.label,
        href: route.route,
        key: route.route,
    }));

    return (
        <aside
            className={`${
                collapsed ? 'w-16' : 'w-64'
            } bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col`}
        >
            <div className="p-4 flex justify-between items-center">
                <h1 className={`font-bold text-xl ${collapsed ? 'hidden' : ''}`}>
                    Menu
                </h1>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-gray-800 rounded"
                >
                    ☰
                </button>
            </div>

            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.key}>
                            <Link

                                href={item.href}
                                className="block p-3 rounded hover:bg-gray-800 transition"
                            >
                                {collapsed ? item.label.charAt(0) : item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;