import axios from 'axios'

const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'
// const delay = () => new Promise((res: any) => setTimeout(() => res(), 800000))
const ticketsApi = axios.create({
    baseURL: BASE_URL
})

export const ticketsUrlEndpoint = '/api/Tickets'

export const getTickets = async (): Promise<Ticket[]> => {
    // await delay()
    const response = await ticketsApi.get(ticketsUrlEndpoint)
    return response.data
}

export const getTicketById = async (id: Ticket["_id"]): Promise<Ticket> => {
    const response = await ticketsApi.get(`${ticketsUrlEndpoint}/${id}`)
    return response.data
}

export const addTicket = async (newTicket: Ticket) => {
    const response = await ticketsApi.post(ticketsUrlEndpoint, newTicket)
    return response.data
}

export const deleteTicket = async (id: Ticket["_id"]) => {
    const response = await ticketsApi.delete(`${ticketsUrlEndpoint}/${id}`)
    return response.data
}

export const updateTicket = async (id: Ticket["_id"], ticket: Ticket) => {
    const response = await ticketsApi.put(`${ticketsUrlEndpoint}/${id}`, ticket)
    return response.data
}