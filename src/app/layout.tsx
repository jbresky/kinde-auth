import "./globals.css";
import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export const metadata = {
  title: "Kinde Auth",
  description: "Kinde with NextJS App Router",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="py-4 px-20 2xl:px-32">
            <div>
              {!(await isAuthenticated()) ? (
                <div className="flex justify-between items-center gap-4">
                  <div className="font-semibold">
                    <Link href="/">Home</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <LoginLink className="rounded-lg border-2 bg-slate-100/40 hover:opacity-70 transition duration-200 py-1 px-2">
                      Sign in
                    </LoginLink>
                    <RegisterLink className="rounded-lg border-2 bg-slate-100/40 py-1 px-2 hover:opacity-70 transition duration-200">Sign up</RegisterLink>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full pt-2">
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
                  <div className="flex items-center gap-6">
                    {user && <Link className="hover:underline" href='/dashboard'>Dashboard</Link>}
                    <LogoutLink className="hover:underline">Log out</LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
