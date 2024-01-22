import TicketCard from "./ticket-card";

interface FilterProps {
    data: any,
    uniqueCategories: string[],
}

const FilteredTickets = ({ data, uniqueCategories }: FilterProps) => {
    return (
        <section className="mt-8">
        {
            // filtering tickets by Category

            data && data.tickets && uniqueCategories?.map((uniqueCategory, categoryIndex: number) => (
                <div key={categoryIndex} className="mb-4">
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