'use client'

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchTicket = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let query = e.currentTarget.query.value

        router.push(`/?q=${query}`)
    }
    return (
        <form onSubmit={onSubmit}>
            <input className='p-3 rounded-lg bg-[#f5f5f5] placeholder:text-gray-600 placeholder:text-sm text-sm outline-none focus:ring focus:ring-slate-300'
                defaultValue={searchParams.get("q") || ""} name="query" placeholder="Search by title..."
            />
        </form>
    )
}

export default SearchTicket;