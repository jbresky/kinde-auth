'use client'

import TicketCard from "./ticket-card";

const FilteredTickets = ({ data }: { data: any }) => {

    const uniqueCategories = [
        //@ts-ignore
        ...new Set(data && data.tickets?.map(({ category }: { category: string }) => category))
    ]

    return (
        <section className="mt-8">
            {
                data && data.tickets && uniqueCategories?.map((uniqueCategory, categoryIndex: number) => (
                    <div className="mb-4" key={categoryIndex}>
                        <h2 className="text-slate-500 font-sans font-medium">{uniqueCategory}</h2>
                                <div className="lg:grid grid-cols-2 2xl:grid-cols-4 gap-2 flex flex-col max-lg:gap-4">
                                    {
                                        data && data.tickets.filter((ticket: Ticket) => ticket.category === uniqueCategory)
                                            .map((filteredTicket: Ticket, _index: any) => (

                                                <TicketCard
                                                    key={_index}
                                                    ticket={filteredTicket}
                                                />
                                            ))
                                    }
                                </div>
                    </div>

                ))
            }
        </section>
    );
}

export default FilteredTickets;