import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import "./Label.css";

type LabelDotProps = {
    className?: string;
    isActive?: boolean;
}

const circleBase = "rounded-full origin-center";
const circleContainer = "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2";

export const LabelDot: React.FC<LabelDotProps> = ({ className, isActive }) => {
    const [animate, setAnimate] = React.useState("");

    const preIsActive = React.useRef(isActive);
    useEffect(() => {
        if (preIsActive.current !== isActive) {
            preIsActive.current = isActive;
            setAnimate(isActive ? "grow" : "shrink");
        }
    }, [isActive])

    return (
        <div className={`flex items-center justify-center full ${className}`}>
            <div className=" w-8 h-8">
                <div className={cn(circleContainer, "innerDot")}>
                    <div className={`${circleBase} w-3 h-3 bg-white ${animate}`} />
                </div>
                <div className={cn(circleContainer, "animate-pulse midDot")}>
                    <div className={`${circleBase} w-5 h-5 blur-[0.5px] bg-white/60 ${animate}`} />
                </div>
                <div className={cn(circleContainer, "animate-pulse outerDot")}>
                    <div className={`${circleBase} w-7 h-7 blur-[1px] bg-white/30 ${animate}`} />
                </div>
            </div>
        </div>
    );
};

