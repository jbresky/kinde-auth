'use client'

import CreateTicket from "./components/tickets/create-ticket";
import useSWR, { preload } from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";
import FilteredTickets from "./components/tickets/filtered-tickets";
import SearchTicket from "./components/searchTicket";
import { BASE_URL } from "@/constant/url";

export const getByTitle = async (title: Ticket["title"]) => {
  const tickets = await fetch(`${BASE_URL}/api/Tickets/search-by-title/${title}`)

  if (!tickets.ok) throw new Error('error')

  return tickets.json()
}

const Home = async ({ searchParams }: { searchParams: { q: string } }) => {

  const { data, isLoading, error } = useSWR(cacheKey, getTickets)

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
          data={searchParams.q ? queryTicket : data }
        />
      </main>
    )
  }

  return (
    <>
      {
        searchParams.q && queryTicket.length < 1
          ? <p className="px-14">No tickets found 😓</p>
          : content
      }
    </>
  );
}

export default Home
