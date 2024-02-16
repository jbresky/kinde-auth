import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { getTicketByUser } from "@/lib/tickets";
import FilteredTickets from "@/app/components/tickets/filtered-tickets";

interface User {
  email: string,
  id: string,
  firstName: string | undefined | null,
  lastName: string | undefined | null,
  profileImage: string | undefined | null
}

async function getUserData({ email, id, firstName, lastName, profileImage }: User) {
  const user = await User.findOne({ email: email })

  if (!user) {
    await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,

    })
  }
}

export default async function DashboardPage({ params }: any) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect('/register')
  }

  const tickets = await getTicketByUser(params.user)

  // const isAuthor = user.email === tickets.tickets. 

  await getUserData({
    email: user.email as string,
    firstName: user.given_name as string,
    id: user.id as string,
    lastName: user.family_name as string,
    profileImage: user.picture
  })

  return (
    <main className="mb-6 px-2 md:px-20">
      <FilteredTickets
        data={tickets}
        user={user}
      />
    </main>
  );
}
