'use client';

import { ThemeSwitch } from "@/components/providers/ThemeSwitch";

const Navbar = () => {

    return (
        <nav className="flex items-center justify-center gap-x-5">
            <ThemeSwitch />
        </nav>
    );
}

export default Navbar;