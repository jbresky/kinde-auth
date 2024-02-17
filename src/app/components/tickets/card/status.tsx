const Status = ({ status }: { status: string }) => {
    let color = status.toLowerCase() 

    return (
        <span
            className={
                `${color === "not started" && 'bg-rose-200'}
                ${color === "started" && 'bg-yellow-200'}
                ${color === "done" && 'bg-lime-300'}
                inline-block opacity-90 rounded-full px-2 py-1 text-xs font-semibold bg-opacity-40`}
        >
            {status}
        </span>
    );
}

export default Status;