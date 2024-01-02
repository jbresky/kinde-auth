'use client'

import CreateTicket from "./components/create-ticket";
import TicketCard from "./components/ticket-card";
import { Toaster } from "react-hot-toast"
import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { preload } from 'swr'

preload(cacheKey, getTickets)

const Home = async () => {

  const { data } = useSWR(cacheKey, getTickets)

  const tickets = data.tickets
  console.log(tickets);
  
  const uniqueCategories = [
    //@ts-ignore
    ...new Set(tickets?.map(({ category }: any) => category))
  ]

  return (
    <>
      <Toaster toastOptions={{ position: 'top-center' }} />
      <main className="m-4">
        {
          tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2 className="text-slate-500 font-semibold">{uniqueCategory}</h2>
              <div className="grid grid-cols-2 2xl:grid-cols-4 gap-2">
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
        <CreateTicket />
      </main>
    </>
  );
}

export default Home
