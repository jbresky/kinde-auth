const Status = ({ status }: { status: string }) => {
    const getColor = (status: string) => {
        let color;
        switch (status.toLowerCase()) {
            case "done":
                color = "bg-[#8bc34a]";
                return color;

            case "started":
                color = "bg-[#ffeb3b]";
                return color;

            case "not started":
                color = "bg-[#ef6565]";
                return color;
            default:
                color = "bg-slate-700";
        }
        return color;
    };
    return (
        <span
            className={`inline-block opacity-90 rounded-full px-2 py-1 text-xs font-semibold ${getColor(status)}`}
        >
            {status}
        </span>
    );
}

export default Status;