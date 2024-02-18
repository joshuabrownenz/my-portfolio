// LabelContainer.tsx
import React from "react";
import { LabelDot } from "./LabelDot";
import { LabelLineAndText } from "./LabelLineAndText"; // Import the new component
import { useWindowSize } from "@uidotdev/usehooks";

type LabelContainerProps = {
    angle: "up" | "right45" | "left45";
    text: string;
    onClick?: () => void;
    /** This is the length of the main stick at 800px screen height. It will be scaled from their */
    lengthAt800?: number;
    textUnderlineLength?: number;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ angle, text, onClick, lengthAt800 = 130, textUnderlineLength = 100 }) => {
    const [active, setActive] = React.useState(false);

    const windowSize = useWindowSize();
    const length = lengthAt800 * (windowSize?.height ?? 800) / 800;

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
