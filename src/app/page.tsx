import CreateTicket from "./components/tickets/create-ticket";
// import useSWR, { preload } from 'swr'
// import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
// import { BeatLoader } from "react-spinners";
import FilteredTickets from "./components/tickets/filtered-tickets";
import SearchTicket from "./components/searchTicket";

// preload(cacheKey, getTickets)
const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'

const getByTitle = async (title: Ticket["title"]) => {
  const tickets = await fetch(`${BASE_URL}/api/Tickets/search-by-title/${title}`)

  if (!tickets.ok) throw new Error('error')

  return tickets.json()
}

const getAllTickets = async () => {
  const tickets = await fetch(`${BASE_URL}/api/Tickets`, {
    cache: 'no-store'
  })

  if (!tickets.ok) throw new Error('error')

  return tickets.json()
}

const Home = async ({ searchParams }: { searchParams: { q: string } }) => {
  // const { data, isLoading, error } = useSWR(cacheKey, getTickets)

  const getData = async () => {
    let data
    if (searchParams.q) {
      data = await getByTitle(searchParams.q)
    } else {
      data = await getAllTickets()
    }

    return data
  }

  const data = await getData()

  const uniqueCategories = [
    //@ts-ignore
    ...new Set(data && data.tickets?.map(({ category }: { category: string }) => category))
  ]

  let content

  if (data.tickets.length < 1) {
  // if (isLoading) {
  // content = <div className="p-24"> <BeatLoader color="gray" /> </div>
  content = <div className="font-sans text-xl mt-10">No matching tickets found 😑</div>
  // else if (error) {
  //   content = <p>{error.message}</p>
  } else {
  content = (
    <main className="mb-6 px-4 md:px-20">
    <div className='flex items-center justify-between text-right mb-6'>
      <CreateTicket />
      <SearchTicket />
    </div>
    <FilteredTickets
      data={data}
      uniqueCategories={uniqueCategories}
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
