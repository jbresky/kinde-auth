'use client'

import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const CreateTicket = () => {
    return (
        <Link href='/ticket-page/new' className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 font-sans font-medium p-2">
                <IoMdAdd />
        </Link>
    );
}

export default CreateTicket;