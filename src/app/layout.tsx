import "./globals.css";
import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

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
          <nav className="py-4 px-10 mx-2 2xl:px-32">
            <div>
              {!(await isAuthenticated()) ? (
                <>
                  <LoginLink className="btn btn-ghost sign-in-btn">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
                </>
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
