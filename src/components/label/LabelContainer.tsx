// LabelContainer.tsx
import React from "react";
import { LabelDot } from "./LabelDot";
import { LabelLineAndText } from "./LabelLineAndText"; // Import the new component

type LabelContainerProps = {
    angle: "up" | "right45" | "left45";
    text: string;
    onClick?: () => void;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ angle, text, onClick }) => {
    const [active, setActive] = React.useState(false);

    return (
        <div
            className="flex justify-center"
            onMouseEnter={() => {
                setActive(true)
                console.log("enter")
            }}
            onMouseLeave={() => {
                setActive(false)
                console.log("leave")
            }}
            onClick={onClick}
            style={{ position: "relative", width: "100px", height: "100px" }} // Ensure enough space for the label and line
        >
            <LabelDot isActive={active} />
            <LabelLineAndText active={active} angle={angle} length={100} text={text} textUnderlineLength={70} /> {/* Example usage */}
        </div>
    );
}
