import axios from 'axios'

const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'
const delay = () => new Promise((res: any) => setTimeout(() => res(), 800))
const ticketsApi = axios.create({
    baseURL: BASE_URL
})

export const ticketsUrlEndpoint = '/api/Tickets'

export const getTickets = async () => {
    // await delay()
    const response = await ticketsApi.get(ticketsUrlEndpoint)
    return response.data
}

export const getTicketById = async (id: string) => {
    const response = await ticketsApi.get(`${ticketsUrlEndpoint}/${id}`)
    return response.data
}

export const addTicket = async (newTicket: any) => {
    const response = await ticketsApi.post(ticketsUrlEndpoint, newTicket)
    return response.data
}

export const deleteTicket = async (id: string) => {
    const response = await ticketsApi.delete(`${ticketsUrlEndpoint}/${id}`)
    return response.data
}

export const updateTicket = async (id: string, ticket: any) => {
    const response = await ticketsApi.put(`${ticketsUrlEndpoint}/${id}`, ticket)
    return response.data
}