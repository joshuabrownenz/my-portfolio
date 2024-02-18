import React from 'react';

type Angle = 'up' | 'left45' | 'right45';
type LabelLineAndTextProps = {
    startX?: number;
    startY?: number;
    active: boolean;
    angle: Angle;
    length: number; // Length of the line
    textUnderlineLength: number;
    text: string;
};

const ACTIVE_LENGTH_INCREASE = 60;

// Calculate start and end point of the line based on angle and length
const calculatePoints = (startX: number, startY: number, angle: Angle, length: number) => {
    let endX = startX;
    let endY = startY - length;

    if (angle === 'left45') {
        endX = startX - length / Math.sqrt(2);
        endY = startY - length / Math.sqrt(2);
    } else if (angle === 'right45') {
        endX = startX + length / Math.sqrt(2);
        endY = startY - length / Math.sqrt(2);
    }

    return { endX, endY };
};

const calculateUnderlinePoints = (endX: number, angle: Angle, length: number) => {
    if (angle === 'up') {
        return { underlineEndX: endX }
    }
    else if (angle === 'left45') {
        return { underlineEndX: endX - length }
    } else {
        return { underlineEndX: endX + length }
    }
};

const calculateTextPosition = (endX: number, endY: number, angle: Angle) => {
    let textX = endX;
    let textY = endY - 20; // Adjust y position for text to appear above the line end

    if (angle === 'left45') {
        textX = endX - 100;
    } else if (angle === 'right45') {
        textX = endX;
    }

    return { textX, textY };
}

const calculateTextAnchor = (angle: Angle) => {
    if (angle === 'up') {
        return "middle"
    }
    else if (angle === 'left45') {
        return "right"
    } else {
        return "left"
    }
}

const calculatePathD = (angle: Angle, startX: number, startY: number, endX: number, endY: number, underlineEndX: number) => {
    // Move to start point
    let d = `M ${startX},${startY} `;
    // Line to end point
    d += `L ${endX},${endY} `;
    // If angle requires, continue line to underline end point
    if (angle === 'left45' || angle === 'right45') {
        d += `L ${underlineEndX},${endY}`;
    }
    return d;
};

export const LabelLineAndText: React.FC<LabelLineAndTextProps> = ({ startX = 50, startY = 50, active, angle, length, textUnderlineLength, text }) => {
    // Adjustments for active state
    const activeLength = active ? length + ACTIVE_LENGTH_INCREASE : length; // Increase length by 50% if active
    const { endX, endY } = calculatePoints(startX, startY, angle, activeLength);
    const { underlineEndX } = calculateUnderlinePoints(endX, angle, textUnderlineLength);

    // Calculate text position and transform if active
    const { endX: nonTransformedEndX, endY: nonTransformedEndY } = calculatePoints(startX, startY, angle, length);
    const { textX, textY } = calculateTextPosition(nonTransformedEndX, nonTransformedEndY, angle);
    const { textX: transformedTextX, textY: transformedTextY } = calculateTextPosition(endX, endY, angle);
    const textTransform = active ? `translate(${transformedTextX - textX}px, ${transformedTextY - textY}px)` : '';
    const textAnchor = calculateTextAnchor(angle);

    const pathD = calculatePathD(angle, startX, startY, endX, endY, underlineEndX);

    // Calculate the hitbox dimensions and position
    // The hitbox should cover the entire area of the line and text
    const hitboxWidth = angle === "up" ? 130 : Math.max(Math.abs(endX - startX), Math.abs(underlineEndX - startX)) + 30;
    const hitboxHeight = startY - Math.min(endY, textY - 40); // Ensure it covers the line and text above

    let hitboxX = startX - hitboxWidth / 2;
    if (angle === 'left45') {
        hitboxX = startX - hitboxWidth
    } else if (angle === 'right45') {
        hitboxX = startX
    }
    const hitboxY = startY - hitboxHeight;

    return (
        <div style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            transition: 'all 0.7s ease',
            transformOrigin: 'center'
        }}>
            <svg width="100" height="100" style={{ overflow: 'visible' }}>
                <rect
                    x={hitboxX}
                    y={hitboxY}
                    width={hitboxWidth}
                    height={hitboxHeight}
                    fill="transparent"
                    stroke="none" // Make it invisible; remove or set to 'transparent' for no border
                    pointerEvents="all" // Ensure it captures mouse events
                />
                <path
                    d={pathD}
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap='round'
                    fill="none"
                    style={{ transition: 'all 0.7s ease' }}
                />
                <text
                    x={textX}
                    y={textY} // Adjust y position for text to appear above the line end
                    fill="white"
                    fontFamily='Manrope'
                    fontSize="24"
                    fontWeight="bold"
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    style={{ transition: 'all 0.7s ease', transform: textTransform }}
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};
