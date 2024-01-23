import Ticket from "@/models/Ticket"
import { NextResponse } from "next/server"

export async function GET(req: Request, context: any) {
    try {
        const { title } = context.params
        const tickets = await Ticket.find({ title })

        return NextResponse.json({ tickets }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error" }, { status: 500 })
    }
}