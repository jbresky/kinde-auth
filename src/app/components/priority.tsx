'use client'

import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";

const Priority = ({ priority }: { priority: number }) => {

    return (
        <div className="flex justify-start align-baseline text-lg">
            {priority === 1 && (
                <FcLowPriority />
            )}
            {priority === 2 && (
                <FcMediumPriority />
            )}
            {priority === 3 && (
                <FcHighPriority />
            )}
        </div>
    );
}

export default Priority;