'use client'

import Link from "next/link";
import DeleteBlock from "./delete-block";
import Priority from "./priority";
import Progress from "./progress";
import Status from "./status";

const TicketCard = () => {
    return (
        <div className="flex flex-col border-2 border-gray-300 rounded-xl hover:shadow-lg transition duration-300 p-4 m-2">
            <div className="flex mb-3">
                <Priority />
                <div className="ml-auto">
                    <DeleteBlock />
                </div>
            </div>
            <Link href={`/TicketPage/{ticket._id}`}>
                <h4 className="mb-1">Ticket title</h4>
                <hr className="h-px border-0 bg-gray-300 mb-2 "></hr>
                <p className="whitespace-pre-wrap">Ticket Description</p>

                <div className="flex-grow"></div>
                <div className="flex mt-2">
                    <div className="flex flex-col">
                        <p className="text-xs  my-1">createdDateTime</p>
                        <Progress />
                    </div>
                    <div className="ml-auto  flex items-end">
                        <Status />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default TicketCard;