import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tickets = await Ticket.find()

        return NextResponse.json({ tickets }, { status: 200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "error"}, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const ticketData = body.formData;

        await Ticket.create(ticketData)

        return NextResponse.json({ message: "ticket created"}, {status: 200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}