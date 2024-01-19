'use client'

import CreateTicket from "./components/tickets/create-ticket";
import useSWR, { preload } from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";
import FilteredTickets from "./components/tickets/filtered-tickets";

preload(cacheKey, getTickets)

const Home = async () => {
  const { data, isLoading, error } = useSWR(cacheKey, getTickets)

  const uniqueCategories = [
    //@ts-ignore
    ...new Set(data && data.tickets?.map(({ category }: { category: string }) => category))
  ]

  let content

  if (isLoading) {
    content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = (
      <main className="mb-6 px-2 md:px-20">
        <div className='text-right mb-6'>
          <input 
          className='p-2 rounded-lg bg-slate-100 placeholder:text-gray-600 placeholder:text-sm text-sm focus:outline-none focus:ring focus:ring-gray-600'
          placeholder='Search by title..'/>
        </div>        
        <FilteredTickets
          data={data}
          uniqueCategories={uniqueCategories}
        />
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
