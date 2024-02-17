interface User {
    name: string,
    email: string
}
interface Ticket {
    _id: string
    title: string,
    description: string,
    category: string,
    priority: number,
    progress: number,
    createdBy: User,
    status: string,
    active: boolean,
    createdAt: Date,
    updatedAt: Date
}