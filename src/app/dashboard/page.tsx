'use client'

import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";
import FilteredTickets from "../components/tickets/filtered-tickets";

export default function Dashboard() {

  const { data, isLoading } = useSWR(cacheKey, getTickets)
  // getTicketsByUser instead

  const uniqueCategories = [
    //@ts-ignore
    ...new Set(data && data.tickets?.map(({ category }: { category: string }) => category))
  ]

  let content

  if (isLoading) {
    content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  } else {
    content = (
      <main className="mb-6 px-20">
        <h1 className="text-2xl mt-4">Your tickets</h1>
        <FilteredTickets
          data={data} 
          uniqueCategories={uniqueCategories} />
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
