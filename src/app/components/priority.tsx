'use client'

import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";

const Priority = () => {
    return (
        <div className="flex justify-start align-baseline text-lg">
            {/* <FcHighPriority />
            <FcMediumPriority /> */}
            <FcLowPriority />
        </div>
    );
}

export default Priority;