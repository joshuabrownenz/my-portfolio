// LabelContainer.tsx
import React, { useEffect, useState } from "react";
import { LabelDot } from "./LabelDot";
import { LabelLineAndText } from "./LabelLineAndText"; // Import the new component
import { useWindowSize } from "@uidotdev/usehooks";

type LabelContainerProps = {
    active: boolean;
    setActive: (active: boolean) => void;
    angle: "up" | "right45" | "left45";
    text: string;
    /** This is the length of the main stick at 800px screen height. It will be scaled from their */
    lengthAt800?: number;
    textUnderlineLength?: number;
    href: string;
}

export const LabelContainer: React.FC<LabelContainerProps> = ({ angle, text, lengthAt800 = 130, textUnderlineLength = 100, active, setActive, href }) => {
    const [loaded, setLoaded] = useState(false);
    const windowSize = useWindowSize();
    const length = lengthAt800 * (windowSize?.height ?? 800) / 800;

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <a href={href}
            onFocus={(e) => {
                setActive(true)
            }}
            onBlur={(e) => {
                setActive(false)
            }}
            onMouseOver={(e) => {
                setActive(true)
            }}
            onMouseOut={(e) => {
                setActive(false)
            }}>
            <div
                className={`flex justify-center`}
                style={{ position: "relative", width: "100px", height: "100px", marginLeft: "-50px", marginTop: "-50px" }} // Ensure enough space for the label and line
            >
                <LabelDot isActive={active} />
                <LabelLineAndText active={active} angle={angle} length={length} text={text} textUnderlineLength={textUnderlineLength} /> {/* Example usage */}
            </div>
        </a>
    );
}
