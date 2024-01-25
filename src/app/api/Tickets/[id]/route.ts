import Ticket from "@/models/Ticket";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
    const { id } = params
    const foundTicket = await Ticket.findOne({ _id: id })
    return NextResponse.json({ foundTicket }, { status: 200 })
}

export async function PUT(req: Request, { params }: any) {
    try {
        const { id } = params

        const body = await req.json()
        const ticketData = body.formData

        await Ticket.findByIdAndUpdate(id, {
            ...ticketData
        })

        revalidatePath('/')

        return NextResponse.json({ message: "Ticket updated" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: any) {
    try {
        const { id } = params

        await Ticket.findByIdAndDelete(id)

        return NextResponse.json({ message: "Ticket deleted" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}