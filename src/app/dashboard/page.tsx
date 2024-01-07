'use client'

import TicketCard from "../components/ticket-card";
import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";

export default function Dashboard() {
  const { data, isLoading } = useSWR(cacheKey, getTickets)
  // getTicketsByUser instead

  const uniqueCategories = [
    //@ts-ignore
    ...new Set(data && data.tickets?.map(({ category }: any) => category))
  ]

  let content

  if (isLoading) {
    content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  } else {
    content = (
      <main className="mb-6 px-20">
        <h1 className="text-2xl">Your tickets</h1>
        {
          data && data.tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="my-6">
              <h2 className="text-slate-500 font-semibold">{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 2xl:grid-cols-4 gap-2">
                {
                  data && data.tickets.filter((ticket: any) => ticket.category === uniqueCategory)
                    .map((filteredTicket: any, _index: any) => (
                      <TicketCard
                        // id={_index}
                        key={_index}
                        ticket={filteredTicket}
                      />
                    ))
                }
              </div>
            </div>
          ))
        }
        {
          data && data.tickets.length === 0 && <p>You don&apos;t have tickets asigned</p>
        }
      </main>
    )
  }

  return (
    <>
      {content}
    </>
  );
}
