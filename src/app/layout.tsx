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
          <nav className="p-4 2xl:px-32">
            <div>
              {!(await isAuthenticated()) ? (
                <div className="flex items-center gap-4">
                  <Link href="/">Home</Link>
                  <LoginLink className="rounded-lg border-2 bg-slate-100 hover:opacity-70 transition duration-200 p-2">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="rounded-lg border-2 bg-slate-100 p-2 hover:opacity-70 transition duration-200">Sign up</RegisterLink>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full font-semibold">
                  {user?.picture ? (
                      <img
                        className="avatar"
                        src={user?.picture}
                        alt="user profile avatar"
                        referrerPolicy="no-referrer"
                      />
                  ) : (
                    <div className="avatar">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="">
                      {user?.given_name}
                      {user?.family_name}
                    </p>

                    <LogoutLink className="">Log out</LogoutLink>
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
