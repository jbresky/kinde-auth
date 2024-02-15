'use client'

import { ticketsUrlEndpoint as cacheKey, updateTicket, getTickets, addTicket } from "@/services/swr/tickets-api";
import { useRouter } from "next/navigation";
import { useState, useId } from "react"
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { toast, Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import { BeatLoader } from "react-spinners";

const EditTicketForm = ({ ticket, email }: { ticket: Ticket, email: string }) => {
  const [loading, setLoading] = useState(false)

  const { mutate } = useSWR(cacheKey, getTickets)

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
    createdBy: email
  }

  if (EDITMODE) {
    initialTicketData["title"] = ticket.title
    initialTicketData["description"] = ticket.description
    initialTicketData["priority"] = ticket.priority
    initialTicketData["progress"] = ticket.progress
    initialTicketData["status"] = ticket.status
    initialTicketData["category"] = ticket.category
  }

  const [formData, setFormData] = useState<any>(initialTicketData)

  const addTicketMutation = async (newTicket: any) => {
    try {
      setLoading(true)
      await addTicket(newTicket)
      console.log(newTicket);
      mutate()
      router.push('/')
      setLoading(false)
    } catch (error) {
      toast.error("Failed to create ticket", {
        duration: 1000
      })
    }
  }

  const updateTicketMutation = async (updatedTicket: any) => {
    try {
      setLoading(true)
      await updateTicket(ticket._id, updatedTicket)
      mutate()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Failed to update ticket", {
        duration: 1000
      })
    }
  }

  const handleChange = (e: any) => {

    setFormData((prevState: any) => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (EDITMODE) {
      updateTicketMutation({ formData })
      // setTimeout(() => {
        router.push('/')
      // }, 1000)
    } else {
      addTicketMutation({ formData })
    }
  }
  
  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project"
  ]

  return (
    <>
      <Toaster toastOptions={{ position: 'bottom-center' }} />
      <div className="">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="m-auto flex flex-col gap-2 w-5/6 xl:w-1/2"
        >
          <h3 className="text-2xl font-semibold">{EDITMODE ? 'Update Ticket' : 'Create New Ticket'}</h3>
          <label htmlFor={titleId}>Title</label>
          <input
            id={titleId}
            className="text-sm border-2 p-2 rounded-lg"
            name="title"
            type="text"
            maxLength={30}
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
            maxLength={60}
            required={true}
            value={formData.description}
          />

          <div className="flex gap-5 justify-between py-2 items-center">
            <label htmlFor={categoryId}>Category</label>
            <select className="text-sm text-gray-800 p-2 rounded-md bg-[#f5f5f5]" id={categoryId} name="category" value={formData.category} onChange={handleChange}>
              {categories.map((category, index) => (
                <option key={index} value={category} className="text-gray-600 text-sm">
                  {category}
                </option>
              ))}
            </select>

            <label>Priority</label>
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
          <select className="text-gray-700 text-sm mb-3 p-2 rounded-md bg-[#f5f5f5]" id={statusId} name="status" value={formData.status} onChange={handleChange}>
            <option className="text-gray-500 text-sm" value="not started">Not Started</option>
            <option className="text-gray-500 text-sm" value="started">Started</option>
            <option className="text-gray-500 text-sm" value="done">Done</option>
          </select>
          <input className="hidden" onChange={handleChange} name="createdBy" value={formData.createdBy}/>
          <button
            className="w-full border-2 px-4 py-2 mt-2 rounded-lg hover:shadow-md transition duration-200"
          >
            {loading ? <BeatLoader /> : 'Create Ticket'}
          </button>
        </form>
      </div>
    </>
  );
}

export default EditTicketForm;