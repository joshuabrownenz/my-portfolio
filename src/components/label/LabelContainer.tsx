// LabelContainer.tsx
import React from "react";
import { LabelDot } from "./LabelDot";
import { LabelLineAndText } from "./LabelLineAndText"; // Import the new component

type LabelContainerProps = {
    angle: "up" | "right45" | "left45";
    text: string;
    onClick?: () => void;
    length?: number;
    textUnderlineLength?: number;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ angle, text, onClick, length = 100, textUnderlineLength = 70 }) => {
    const [active, setActive] = React.useState(false);


    return (
        <div
            id="label-container"
            className="flex justify-center"
            onMouseOver={(e) => {
                setActive(true)
                console.log("enter")
            }}
            onMouseOut={(e) => {
                setActive(false)
                console.log("leave")
            }}
            onClick={onClick}
            style={{ position: "relative", width: "100px", height: "100px", marginLeft: "-50px", marginTop: "-50px" }} // Ensure enough space for the label and line
        >
            <LabelDot isActive={active} />
            <LabelLineAndText active={active} angle={angle} length={length} text={text} textUnderlineLength={textUnderlineLength} /> {/* Example usage */}
        </div>
    );
}
