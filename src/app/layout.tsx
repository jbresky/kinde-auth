import "./globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import WelcomeNav from "./components/nav/welcome-nav";
import AuthNav from "./components/nav/auth-nav";

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
          <nav className="py-6 px-4 md:px-20">
            <div>
              {!(await isAuthenticated()) ? (
                <WelcomeNav />
              ) : (
                <AuthNav user={user} />
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
