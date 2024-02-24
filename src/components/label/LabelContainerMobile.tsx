// LabelContainer.tsx
import React, { useEffect, useState } from "react";
import { LabelDot } from "./LabelDot";
import { LabelLineAndText } from "./LabelLineAndText"; // Import the new component
import { useWindowSize } from "@uidotdev/usehooks";
import { LabelDotMobile } from "./LabelDotMobile";

type LabelContainerProps = {
    text: string;
    href: string;
}

export const LabelContainerMobile: React.FC<LabelContainerProps> = ({ text, href }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 500);
    }, [])

    return (
        <a href={href}
            className={`${!loaded ? "opacity-0" : ""} transition-opacity duration-700 w-fit`}>
            <div
                className={`flex text-center justify-center items-center gap-2`}
            >
                {/* <LabelDotMobile /> */}
                <div className="font-bold text-center text-[32px]">
                    {text}
                </div>
            </div>
        </a >
    );
}
