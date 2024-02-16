import "./globals.css";
import WelcomeNav from "./components/nav/welcome-nav";
import AuthNav from "./components/nav/auth-nav";
import getLoggedInUser from "@/lib/get-user";

export const metadata = {
  title: "Kinde Auth",
  description: "Kinde with NextJS App Router",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getLoggedInUser();
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="py-6 px-4 md:px-20">
            <div>
              {!user ? (
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
