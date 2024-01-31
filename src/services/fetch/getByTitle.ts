const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'

export const getByTitle = async (title: Ticket["title"]) => {
  const tickets = await fetch(`${BASE_URL}/api/Tickets/search-by-title/${title}`)

  if (!tickets.ok) throw new Error('error')

  return tickets.json()
}