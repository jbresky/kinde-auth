import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const WelcomeNav = () => {
    return ( 
        <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-mono">Ticketing app</Link>
        <div className="flex items-center font-sans">
            <LoginLink className="rounded-lg hover:bg-[#f5f5f5] font-medium transition duration-200 py-3 px-5">
                Sign in
            </LoginLink>
            <RegisterLink className="rounded-lg hover:bg-[#f5f5f5] font-medium transition duration-200 py-3 px-5">Sign up</RegisterLink>
        </div>
    </div>
)}
 
export default WelcomeNav;