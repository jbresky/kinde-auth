'use client'

import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";
import FilteredTickets from "../components/tickets/filtered-tickets";
import Dashboard from '../components/dashboard/dashboard';
import SearchTicket from '../components/searchTicket';

export default function DashboardPage() {

  const { data, isLoading } = useSWR(cacheKey, getTickets)
  // getTicketsByUser instead

  let content

  if (isLoading) {
    content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  } else {
    content = (
      <main className="mb-6 px-2 md:px-20">
        <div className='text-right mb-6'>
          <SearchTicket />
        </div>
        <Dashboard />
        <FilteredTickets
          data={data}
          />
      </main>
    )
  }

  return (
    <>
      {content}
    </>
  );
}
