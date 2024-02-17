import Ticket from "@/models/Ticket";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
    try {
        const { id } = params
        const ticket = await Ticket.findOne({ _id: id })

        if (!ticket) return NextResponse.json({ message: "Ticket not found" }, { status: 404 })

        const user = await User.findOne({ email: ticket.createdBy })

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })

        const ticketWithUserData = {
            _id: ticket._id,
            title: ticket.title,
            description: ticket.description,
            category: ticket.category,
            priority: ticket.priority,
            createdBy: {
                email: user.email,
                name: user.firstName + ' ' + user.lastName
            },
            status: ticket.status,
            active: ticket.active,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt
        }

        return NextResponse.json({ ticketWithUserData }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to fetch tickets" }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: any) {
    try {
        const { id } = params

        const body = await req.json()
        const ticketData = body.formData

        await Ticket.findByIdAndUpdate(id, {
            ...ticketData
        })

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