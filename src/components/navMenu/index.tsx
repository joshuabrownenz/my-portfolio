import React, { useState } from "react";

export const NavMenu = () => {
    const size = 200;
    const baseStrokeWidth = 5;
    const hoverStrokeWidth = 10; // Larger stroke width on hover
    const radius = (size - baseStrokeWidth - 50) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const segments = 5; // Number of arcs for the top half
    const totalCoverage = Math.PI; // Total angular coverage for all segments (180 degrees)
    const segmentCoverage = totalCoverage / segments; // The angular coverage of each segment
    const segmentLength = radius * segmentCoverage; // Length of each segment
    const gap = segmentLength / 4; // Gap between segments, adjust to preference

    // Correct the total length of all segments and gaps to match half the circumference
    const adjustedSegmentLength = (radius * Math.PI - gap * segments) / segments;
    const dashArrayLength = adjustedSegmentLength + gap;

    const [hoveredIndex, setHoveredIndex] = useState(-1);

    // Function to generate the SVG path for the jutting lines
    const generateLinePath = (index, isHovered) => {
        // Calculate the angle for the center of the segment
        const angle = segmentCoverage * (index - 2); // Adjusting the angle so the 3rd segment is at the top
        // Adjust the line length based on hover
        const length = isHovered ? 20 : 15;
        // Calculate the starting point
        const startX = size / 2 + radius * Math.cos(angle - Math.PI / 2);
        const startY = size / 2 + radius * Math.sin(angle - Math.PI / 2);
        // Calculate the ending point
        const endX = startX + length * Math.cos(angle - Math.PI / 2);
        const endY = startY + length * Math.sin(angle - Math.PI / 2);
        return `M${startX},${startY} L${endX},${endY}`;
    };

    // Function to calculate the dash offset for each segment
    const calculateDashOffset = (index) => {
        // Offset is calculated to position the 3rd segment at the 12 o'clock position
        const totalLength = 2 * Math.PI * radius;
        const offsetForHalfArcToTop = totalLength / 4;
        const segmentOffset = dashArrayLength * (index + 2 * Math.PI /2);
        return -offsetForHalfArcToTop - segmentOffset;
    };

    return (
        <svg width={size} height={size} viewBox={viewBox}>
            {Array.from({ length: segments }).map((_, index) => {
                const isHovered = index === hoveredIndex;
                // Calculate the stroke dash for the segments
                const dashArray = `${adjustedSegmentLength} ${2 * Math.PI * radius - dashArrayLength}`;
                // Calculate the stroke offset to position the segments correctly
                const strokeDashoffset = calculateDashOffset(index);

                const linePath = generateLinePath(index, isHovered); // Path for the jutting lines

                return (
                    <g key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(-1)}>
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="white"
                            strokeWidth={isHovered ? hoverStrokeWidth : baseStrokeWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={strokeDashoffset}
                            style={{
                                transition: "all 0.3s ease",
                            }}
                        />
                        <path
                            d={linePath}
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                            style={{
                                opacity: isHovered ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                            }}
                        />
                    </g>
                );
            })}
        </svg>
    );
};
