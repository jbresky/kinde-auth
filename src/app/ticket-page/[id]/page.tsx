import EditTicketForm from "@/app/components/tickets/edit-ticket-form"
import getLoggedInUser from "@/lib/get-user"
import { getTicketById } from "@/lib/tickets"
import { redirect } from "next/navigation"

let updateTicketData: any = {}
const TicketPage = async ({ params }: any) => {
    const user = await getLoggedInUser()

    if (!user) redirect('/register')

    const username = user.given_name + ' ' + user.family_name
    const EDITMODE = params.id === "new" ? false : true

    if (EDITMODE) {
        updateTicketData = await getTicketById(params.id)
        updateTicketData = updateTicketData.ticketWithUserData
    } else {
        updateTicketData = {
            _id: "new"
        }
    }

    return <EditTicketForm email={user.email} name={username} ticket={updateTicketData} />
}

export default TicketPage;