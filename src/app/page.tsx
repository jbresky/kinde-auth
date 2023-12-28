import TicketCard from "./components/ticket-card";
const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'

const getTickets = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Tickets`, {
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch topics")
    }

    return res.json()

  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

const Home = async () => {
  const data = await getTickets()

  if (!data.tickets) {
    return <p>No tickets</p>
  }

  const tickets = data.tickets

  const uniqueCategories = [
    //@ts-ignore
    ...new Set(tickets?.map(({ category }: any) => category))
  ]

  return (
    // <div className="px-4">Tickets</div>
    <div className="px-4">
      {
        tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2 className="text-slate-500 font-semibold">{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 2xl:grid-cols-4 gap-2">
              {
                tickets.filter((ticket: any) => ticket.category === uniqueCategory)
                  .map((filteredTicket: any, _index: any) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home
