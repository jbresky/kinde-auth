'use client'

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavDrawer from "./nav-drawer";

const AuthNav = ({ user }: { user: any }) => {
    const path = usePathname()

    return (
        <div className="flex justify-between items-center w-full">
            <div>
                <Link href="/" className="text-2xl font-mono">Ticketing</Link>
            </div>
            <div className="flex items-center font-sans font-medium">
                {user && path !== '/dashboard' && <Link className="rounded-lg hover:bg-[#f5f5f5] font-medium transition duration-200 py-3 px-5 hidden sm:block" href='/dashboard'>Dashboard</Link>}
                <LogoutLink className="rounded-lg hover:bg-[#f5f5f5] font-medium transition duration-200 py-3 px-5 mr-3 hidden sm:block">Log out</LogoutLink>
                {user?.picture ? (
                    <NavDrawer user={user} />
                ) : (
                    <div className="avatar">
                        {user?.given_name?.[0]}
                        {user?.family_name?.[0]}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthNav;