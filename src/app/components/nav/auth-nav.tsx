import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const AuthNav = ({ user }: { user: any }) => {
    return (
        <div className="flex justify-between items-center w-full pt-2">
            <div>
                <Link href="/" className="text-2xl font-mono">Ticketing App</Link>
            </div>
            <div className="flex items-center font-sans font-medium gap-6">
                {user && <Link className="hover:underline hidden sm:block" href='/dashboard'>Dashboard</Link>}
                <LogoutLink className="hover:underline hidden sm:block">Log out</LogoutLink>
                {user?.picture ? (
                    <Link href='/'>
                        <img
                            className="avatar"
                            src={user?.picture}
                            alt="user profile avatar"
                            referrerPolicy="no-referrer"
                        />
                    </Link>
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