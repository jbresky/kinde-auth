'use client'

import Link from "next/link";
import DeleteBlock from "./delete-block";
import Priority from "./priority";
import Progress from "./progress";
import Status from "./status";

const TicketCard = ({ ticket }: any) => {

    function formatTimestamp(timestamp: any) {

        const date = new Date(timestamp)
        const formattedDate = date.toLocaleString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })

        return formattedDate
    }

    const createdAt = formatTimestamp(ticket.createdAt)

    return (
        <div className="flex flex-col border-2 border-gray-300 rounded-xl hover:shadow-lg transition duration-300 p-4 mt-2">
            <div className="flex mb-3">
                <Priority priority={ticket.priority}/>
                <div className="ml-auto">
                    <DeleteBlock />
                </div>
            </div>
            <Link href={`/ticket-page/${ticket._id}`}>
                <h4 className="mb-1 font-semibold">{ticket.title}</h4>
                <hr className="h-px border-0 bg-gray-300 mb-2 "></hr>
                <p className="whitespace-pre-wrap">{ticket.description}</p>

                <div className="flex-grow"></div>
                <div className="flex mt-2">
                    <div className="flex flex-col">
                        <p className="text-xs my-1">{createdAt}</p>
                        <Progress progress={ticket.progress} />
                    </div>
                    <div className="ml-auto flex items-end">
                        <Status status={ticket.status} />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default TicketCard;