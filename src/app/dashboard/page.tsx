'use client'

import TicketCard from "../components/ticket-card";
import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";

export default function Dashboard() {
  const { data, isLoading } = useSWR(cacheKey, getTickets)
  // getTicketsByUser instead

  return (
    <div className="py-4 px-20 2xl:px-32">
        <h1 className="text-2xl">Your tickets</h1>
      <div className="lg:grid grid-cols-2 2xl:grid-cols-4 mt-3">
        {
          isLoading ? <p>Loading...</p> : (
            data && data.tickets.map((ticket: any) => (
              <TicketCard ticket={ticket} />
            ))
          )
        }
        {
          data.tickets.length === 0 && <p>You don&apos;t have tickets asigned</p>
        }
      </div>
    </div>
  );
}
