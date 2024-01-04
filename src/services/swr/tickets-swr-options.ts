export const deleteTicketOptions = (id: string) => {
    return {
        optimisticData: (tickets: any) => {
            return tickets.filter((ticket: any) => {
                return ticket.id !== id
            })
        },
        rollbackOnError: true,
        populateCache: (emptyResponseObj: any, tickets: any) => {
            return tickets.filter((ticket: any) => {
                return ticket.id !== id
            })
        },
        revalidate: false
    }
}