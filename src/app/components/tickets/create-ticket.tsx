'use client'

import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const CreateTicket = () => {
    return (
        <Link href='/ticket-page/new' className="flex items-center justify-center gap-2 font-semibold border-2 border-gray-300 bg-slate-100/40 rounded-xl hover:shadow-md transition duration-300 p-4 mt-2 w-full sm:w-1/2 h-[170px]">
                <IoMdAdd />
                <h1>Add new ticket</h1>
        </Link>
    );
}

export default CreateTicket;