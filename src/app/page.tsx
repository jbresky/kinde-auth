import HomeClient from "./components/home-client";
import { redirect } from "next/navigation";
import getLoggedInUser from "@/lib/get-user";

const Home = async () => {
  const user = await getLoggedInUser()

  if (!user) {
    redirect('/register')
  }
  return (
    <HomeClient user={user} />
  );
}

export default Home
