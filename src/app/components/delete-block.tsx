'use client'

import { revalidatePath } from "next/cache";
import { AiTwotoneDelete } from "react-icons/ai";
import { useRouter } from 'next/navigation'

const DeleteBlock = ({ id }: { id: string }) => {
    const router = useRouter()

    const BASE_URL = process.env.NODE_ENV == 'production' ? 'https://kinde-auth-sand.vercel.app' : 'http://localhost:3000'

    const deleteTicket = async () => {
        const res = await fetch(`http://localhost:3000/api/Ticket/${id}`, {
            method: "DELETE",
        })
        if (res.ok) {
            // revalidatePath('/')
            router.refresh()
        }
    }
    
    return (
        <>
            <AiTwotoneDelete onClick={deleteTicket} />
        </>
    );
}

export default DeleteBlock;