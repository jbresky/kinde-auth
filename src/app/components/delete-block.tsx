'use client'

import { AiTwotoneDelete } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import { useState } from 'react'
import { ticketsUrlEndpoint as cacheKey, deleteTicket, getTickets } from "@/services/swr/tickets-api";
import { deleteTicketOptions } from "@/services/swr/tickets-swr-options";
import { BeatLoader } from "react-spinners";

const DeleteBlock = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false)
    const { mutate, isLoading } = useSWR(cacheKey, getTickets)

    const deleteTicketMutation = async () => {
        try {
            setLoading(true)
            await deleteTicket(id)
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
        <Toaster toastOptions={{ position: 'bottom-center'}}/>
            {loading ? <BeatLoader /> : <AiTwotoneDelete onClick={deleteTicketMutation} />}
        </>
    );
}

export default DeleteBlock;