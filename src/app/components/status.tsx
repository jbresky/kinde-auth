const Status = ({ status }: { status?: string }) => {
  
    return (
        <span
            className={`inline-block rounded-full text-[#1b9036] px-2 py-1 border-[2px] border-gray-300 text-xs font-semibold`}
        >
            {/* {status} */}
            Done
        </span>
    );
}

export default Status;