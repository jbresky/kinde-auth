'use client'

import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const CreateTicket = () => {
    return (
        <Link href='/ticket-page/new' className="w-full 2xl:w-1/4 h-[170px] flex items-center justify-center gap-2 font-sans font-semibold border-2 border-gray-300 bg-slate-100/40 rounded-xl hover:shadow-sm transition duration-200 p-4 mt-2">
                <IoMdAdd />
                <h1>Add new ticket</h1>
        </Link>
    );
}

export default CreateTicket;