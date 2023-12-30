'use client'

import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const CreateTicket = () => {
    return (
        <div className="flex justify-center border-2 border-gray-300 rounded-xl hover:shadow-lg transition duration-300 p-4 mt-2">
            <Link href='/ticket-page/new' className="flex items-center gap-2 font-semibold">
                <IoMdAdd />
                <h1>Add new ticket</h1>
            </Link>
        </div>
    );
}

export default CreateTicket;