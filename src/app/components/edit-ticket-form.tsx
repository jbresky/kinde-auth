'use client'

import { useRouter } from "next/navigation";
import { useState, useId } from "react"
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";

const EditTicketForm = ({ ticket }: { ticket: any }) => {
  const EDITMODE = ticket._id === "new" ? false : true
  const router = useRouter()

  const titleId = useId()
  const descriptionId = useId()

  const priority1 = useId()
  const priority2 = useId()
  const priority3 = useId()

  const progressId = useId()
  const statusId = useId()
  const categoryId = useId()

  const initialTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  }

  if (EDITMODE) {
    initialTicketData["title"] = ticket.title
    initialTicketData["description"] = ticket.description
    initialTicketData["priority"] = ticket.priority
    initialTicketData["progress"] = ticket.progress
    initialTicketData["status"] = ticket.status
    initialTicketData["category"] = ticket.category
  }

  const [formData, setFormData] = useState(initialTicketData)

  const handleChange = (e: any) => {

    setFormData((prevState: any) => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formData })
      })

      if (!res.ok) throw new Error("Failed to update ticket")

    } else {

      const res = await fetch('/api/Tickets', {
        method: "POST",
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application-json",
      })

      if (!res.ok) throw new Error("Failed to create ticket")
    }

    router.refresh()
    router.push('/')
  }

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Deveopment",
    "Project"
  ]

  return (
    <div className="my-10">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="m-auto flex flex-col gap-5 w-5/6 xl:w-1/2"
      >
        <h3 className="text-2xl font-semibold">{EDITMODE ? 'Update ticket' : 'Create New Ticket'}</h3>
        <label htmlFor={titleId}>Title</label>
        <input
          id={titleId}
          className="text-sm border-2 p-2 rounded-lg"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label htmlFor={descriptionId}>Description</label>
        <textarea
          id={descriptionId}
          name="description"
          className="text-sm border-2 p-2 rounded-lg"
          onChange={handleChange}
          required={true}
          value={formData.description}
        />

        <label htmlFor={categoryId}>Category</label>
        <select className="text-sm text-gray-800" id={categoryId} name="category" value={formData.category} onChange={handleChange}>
          {categories.map((category, index) => (
            <option key={index} value={category} className="text-gray-600 text-sm">
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div className="flex flex-col gap-5 justify-between items-left">
          <div className="flex gap-5">
            <input
              id={priority1}
              name="priority"
              type="radio"
              onChange={handleChange}
              value={1}
              checked={formData.priority == 1}
            />
            <label>
              <FcLowPriority />
            </label>
          </div>
          <div className="flex gap-5">
            <input
              id={priority2}
              name="priority"
              type="radio"
              onChange={handleChange}
              value={2}
              checked={formData.priority == 2}
            />
            <label>
              <FcMediumPriority />
            </label>
          </div>
          <div className="flex gap-5">
            <input
              id={priority3}
              name="priority"
              type="radio"
              onChange={handleChange}
              value={3}
              checked={formData.priority == 3}
            />
            <label>
              <FcHighPriority />
            </label>
          </div>
        </div>

        <label htmlFor={progressId}>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label htmlFor={statusId}>Status</label>
        <select className="text-gray-700 text-sm" id={statusId} name="status" value={formData.status} onChange={handleChange}>
          <option className="text-gray-500 text-sm" value="not started">Not Started</option>
          <option className="text-gray-500 text-sm" value="started">Started</option>
          <option className="text-gray-500 text-sm" value="done">Done</option>
        </select>
        <button
          className="w-full border-2 px-4 py-2 rounded-lg hover:shadow-md transition duration-200"
        >
          {EDITMODE ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
}

export default EditTicketForm;