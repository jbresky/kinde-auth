'use client'

import { AiTwotoneDelete } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import { useState } from 'react'
import { ticketsUrlEndpoint as cacheKey, deleteTicket, getTickets } from "@/services/swr/tickets-api";
import { BeatLoader } from "react-spinners";

const DeleteBlock = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false)
    const { mutate } = useSWR(cacheKey, getTickets)

    const deleteTicketMutation = async () => {
        try {
            setLoading(true)
            await deleteTicket(id) 
            mutate()

            toast.success("Succes! Item deleted", {
                duration: 1000,
                icon: '🎉'
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error("Failed to delete item", {
                duration: 1000
            })
        }
    }

    return (
        <>
            <Toaster toastOptions={{ position: 'bottom-center' }} />
            {loading ? <BeatLoader /> : <AiTwotoneDelete onClick={deleteTicketMutation} />}
        </>
    );
}

export default DeleteBlock;