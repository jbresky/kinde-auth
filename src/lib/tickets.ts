import { BASE_URL } from "@/constant/url";

export const getTicketByUser = async (user: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/Tickets/get-by-user/${user}`, {
        cache: 'no-store'
      })
  
      if(!res.ok) throw new Error("Failed to fetch ticket")
  
      return res.json()
  
    } catch (error) {
        console.log(error);
    }
  }

  export const getTicketById = async (id: string) => {
    try {
        const res = await fetch(`${BASE_URL}/api/Tickets/${id}`, {
            cache: 'no-store'
        })

        if (!res.ok) throw new Error("Failed to fetch ticket")

        return res.json()

    } catch (error) {
        console.log(error);
    }
}