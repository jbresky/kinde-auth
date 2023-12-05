'use client'

import { useRouter } from "next/navigation";

const EditTicketForm = ({ ticket }: any) => {
    const EDITMODE = ticket._id === "new" ? false : true
    const router = useRouter()
    const initialTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem",
    }

    if (EDITMODE) {
        initialTicketData["title"] = ticket.title;
        initialTicketData["description"] = ticket.description;
        initialTicketData["priority"] = ticket.priority;
        initialTicketData["progress"] = ticket.progress;
        initialTicketData["status"] = ticket.status;
        initialTicketData["category"] = ticket.category;
      }

    return ( 
        <></>
     );
}

export default EditTicketForm;