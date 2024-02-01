'use client'

import CreateTicket from "./components/tickets/create-ticket";
import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";
import FilteredTickets from "./components/tickets/filtered-tickets";

const Home = () => {

  const { data, isLoading, error } = useSWR(cacheKey, getTickets)

  let content

  if (isLoading) {
    content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = (
      <main className="mb-6 px-4 md:px-20">
        <div className='flex items-center justify-between text-right mb-6'>
          <CreateTicket />
        </div>
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

export default Home
