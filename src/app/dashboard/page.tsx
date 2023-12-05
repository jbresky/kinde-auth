import TicketCard from "../components/ticket-card";

export default function Dashboard() {
  return (
    <div className="px-10">
      <div className="lg:grid grid-cols-2 2xl:grid-cols-4 gap-2">
      <TicketCard />
      <TicketCard />
      <TicketCard />
      <TicketCard />
      </div>
    </div>
  );
}
