'use client'

import CreateTicket from "./components/tickets/create-ticket";
import useSWR, { preload } from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";
import FilteredTickets from "./components/tickets/filtered-tickets";
import SearchTicket from "./components/searchTicket";
import { getByTitle } from "@/services/fetch/getByTitle";

// preload(cacheKey, getTickets)

const Home = async ({ searchParams }: { searchParams: { q: string } }) => {

  const { data, isLoading, error } = useSWR(cacheKey, getTickets )

  let content

  let queryTicket
  if (searchParams.q) {
    queryTicket = await getByTitle(searchParams.q)
  }

  if (isLoading) {
    content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  } else if (error) {
    content = <p>{error.message}</p>
  // } else if (isValidating) {
  //   content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  } else {
    content = (
      <main className="mb-6 px-4 md:px-20">
        <div className='flex items-center justify-between text-right mb-6'>
          <CreateTicket />
          <SearchTicket />
        </div>
        <FilteredTickets
          data={searchParams.q ? queryTicket : data}
        />
      </main>
    )
  }

  return (
    <>
      {
        searchParams.q && queryTicket.tickets.length < 1
          ? <p className="p-24">No tickets found 😓</p>
          : content
      }
    </>
  );
}

export default Home
