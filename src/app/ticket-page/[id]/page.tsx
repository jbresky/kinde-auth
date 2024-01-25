import EditTicketForm from "@/app/components/tickets/edit-ticket-form"

const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'

const getTicketById = async (id: string) => {
    try {
        const res = await fetch(`${BASE_URL}/api/Tickets/${id}`, {
            cache: 'no-store'
        })

        if(!res.ok) throw new Error("Failed to fetch ticket")

        return res.json()

    } catch (error) {
        console.log(error);
    }
}

let updateTicketData: any = {}
const TicketPage = async ({ params }: any) => {
    const EDITMODE = params.id === "new" ? false : true

    if(EDITMODE) {
        updateTicketData = await getTicketById(params.id)
        updateTicketData = updateTicketData.foundTicket
    } else {
        updateTicketData = {
            _id: "new"
        }
    }

    return <EditTicketForm ticket={updateTicketData} />
}

export default TicketPage;