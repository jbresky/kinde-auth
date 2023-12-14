
import TicketCard from "./components/ticket-card";

const getTickets = async () => {
  try {

    const res = await fetch("http://localhost:3000/api/Tickets", {
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
    <div className="container">
      {
        tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex}>
            <h2>{uniqueCategory}</h2>
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
        ))
      }
    </div>
  );
}

export default Home
