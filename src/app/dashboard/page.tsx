'use client'

import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";
import FilteredTickets from "../components/tickets/filtered-tickets";
import Dashboard from '../components/dashboard/dashboard';

export default function DashboardPage() {

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
      <main className="mb-6 px-2 md:px-20">
        <div className='text-right mb-6'>
          <input 
          className='p-2 rounded-lg bg-slate-100 placeholder:text-gray-600 placeholder:text-sm text-sm focus:outline-none focus:ring focus:ring-gray-600'
          placeholder='Search by title..'/>
        </div>        
        <Dashboard />
        <FilteredTickets
          data={data}
          uniqueCategories={uniqueCategories} />
        {console.log(data.tickets)
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
