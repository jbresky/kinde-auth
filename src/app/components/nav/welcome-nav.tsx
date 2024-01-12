import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const WelcomeNav = () => {
    return ( 
        <div className="flex justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-mono">Ticketing app</Link>
        <div className="flex items-center gap-4">
            <LoginLink className="rounded-lg border-2 bg-slate-100/40 hover:opacity-70 transition duration-200 py-1 px-2">
                Sign in
            </LoginLink>
            <RegisterLink className="rounded-lg border-2 bg-slate-100/40 py-1 px-2 hover:opacity-70 transition duration-200">Sign up</RegisterLink>
        </div>
    </div>
)}
 
export default WelcomeNav;