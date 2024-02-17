import Ticket from "@/models/Ticket"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
    const { user } = params
    const tickets = await Ticket.find({ "createdBy.email": user })
    return NextResponse.json({ tickets }, { status: 200 })
}