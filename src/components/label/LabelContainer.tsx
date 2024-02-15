// LabelContainer.tsx
import React from "react";
import { LabelDot } from "./LabelDot";
import { LabelLineAndText } from "./LabelLineAndText"; // Import the new component

type LabelContainerProps = {
    angle: "up" | "right45" | "left45";
    text: string;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ angle, text }) => {
    const [active, setActive] = React.useState(false);

    return (
        <div
            className="flex items-end justify-center"
            onMouseEnter={() => {
                setActive(true)
                console.log("enter")
            }}
            onMouseLeave={() => {
                setActive(false)
                console.log("leave")
            }}
            style={{ position: "relative", width: "200px", height: "200px" }} // Ensure enough space for the label and line
        >
            <LabelDot isActive={active} />
            <LabelLineAndText active={active} angle={angle} length={100} text={text} /> {/* Example usage */}
        </div>
    );
}
