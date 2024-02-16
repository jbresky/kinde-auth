'use client'

import useSWR from 'swr'
import { getTickets, ticketsUrlEndpoint as cacheKey } from "@/services/swr/tickets-api";
import { BeatLoader } from 'react-spinners';
import CreateTicket from './tickets/create-ticket';
import FilteredTickets from './tickets/filtered-tickets';

const HomeClient = ({ user }: { user: any }) => {
  const { data, isLoading, error } = useSWR(cacheKey, getTickets)
  console.log(data)

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

        {data.tickets.length === 0 ?
          <p className='mt-12'>There are no tickets!</p>
          : <FilteredTickets
            user={user}
            data={data}
          />
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

export default HomeClient;