'use client'

import { AiTwotoneDelete } from "react-icons/ai";
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { ticketsUrlEndpoint as cacheKey, deleteTicket, getTickets } from "@/services/swr/tickets-api";

const DeleteBlock = ({ id }: { id: string }) => {
    const { mutate } = useSWR(cacheKey, getTickets)

    const deleteTicketMutation = async () => {
        try {
            await deleteTicket({ id })
            mutate()
            toast.success("Succes! Item deleted", {
                duration: 1000,
                icon: '🎉'
            })
        } catch (error) {
            toast.error("Failed to delete item", {
                duration: 1000
            })
        }
    }

    return (
        <>
            <AiTwotoneDelete onClick={deleteTicketMutation} />
        </>
    );
}

export default DeleteBlock;