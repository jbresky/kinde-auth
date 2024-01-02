'use client'

import CreateTicket from "./components/create-ticket";
import TicketCard from "./components/ticket-card";
import { Toaster } from "react-hot-toast"
import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { preload } from 'swr'
import Loader from "./components/loader";

// const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'

// const getTickets = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/Tickets`);

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };

preload(cacheKey, getTickets)

const Home = async () => {
  const { data, isLoading, error } = useSWR(cacheKey, getTickets)
  // const data = await getTickets()

  // const tickets = data.tickets

  const uniqueCategories = [
    //@ts-ignore
    ...new Set(data && data.tickets?.map(({ category }: any) => category))
  ]

  let content

  if (isLoading) {
    content = <Loader />
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = (
      // <p>{JSON.stringify(data, null, 2)}</p>
      <main className="m-4">
        {
          data && data.tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2 className="text-slate-500 font-semibold">{uniqueCategory}</h2>
              <div className="grid grid-cols-2 2xl:grid-cols-4 gap-2">
                {
                  data && data.tickets.filter((ticket: any) => ticket.category === uniqueCategory)
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
        <CreateTicket />
      </main>
    )
  }

  return (
    <>
      <Toaster toastOptions={{ position: 'top-center' }} />
      {content}
    </>
  );
}

export default Home
