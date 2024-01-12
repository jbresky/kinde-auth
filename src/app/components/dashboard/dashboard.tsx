'use client'

const Dashboard = () => {
    return ( 
        <div className="w-full border-2 p-4 rounded-lg border-slate-200">
            <div>
                <h1 className="text-2xl">Your Tickets</h1>
            </div>

            <div>
                order by date
                order by categories
                order by status
            </div>
        </div>
     );
}
 
export default Dashboard;