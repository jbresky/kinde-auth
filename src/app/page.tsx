'use client'

import CreateTicket from "./components/create-ticket";
import TicketCard from "./components/ticket-card";
import useSWR, { preload } from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";

// preload(cacheKey, getTickets)

const Home = async () => {
  const { data, isLoading, error } = useSWR(cacheKey, getTickets)

  const uniqueCategories = [
    //@ts-ignore
    ...new Set(data && data.tickets?.map(({ category }: any) => category))
  ]

  let content

  if (isLoading) {
    content = <div className="p-24"> <BeatLoader color="gray"/> </div>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = (
      <main className="mb-6 px-20">
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
      {content}
    </>
  );
}

export default Home
