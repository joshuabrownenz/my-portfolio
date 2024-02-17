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

export const LabelLineAndText: React.FC<LabelLineAndTextProps> = ({ startX = 50, startY = 50, active, angle, length, textUnderlineLength, text }) => {
    // Calculate start and end point of the line based on angle and length
    const calculatePoints = (angle: Angle, length: number) => {
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
        let textY = endY - 10; // Adjust y position for text to appear above the line end

        if (angle === 'left45') {
            textX = endX - 50 ;
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


    // Adjustments for active state
    const activeLength = active ? length * 1.5 : length; // Increase length by 50% if active
    const { endX, endY } = calculatePoints(angle, activeLength);
    const { underlineEndX } = calculateUnderlinePoints(endX, angle, textUnderlineLength);
    const { textX, textY } = calculateTextPosition(endX, endY, angle);
    const textAnchor = calculateTextAnchor(angle);

    return (
        <svg width="100" height="100" style={{ position: 'absolute', overflow: 'visible' }}>
            {/* Draw the line */}
            <line
                x1={startX} // Center of the dot
                y1={startY} // Center of the dot
                x2={endX}
                y2={endY}
                stroke="white"
                strokeWidth="2"
            />
            {angle !== "up" && <line
                x1={endX} // Center of the dot
                y1={endY} // Center of the dot
                x2={underlineEndX}
                y2={endY}
                stroke="white"
                strokeWidth="2"
            />}
            <text
                x={textX}
                y={textY} // Adjust y position for text to appear above the line end
                fill="white"
                fontSize="12"
                fontWeight="bold"
                textAnchor={textAnchor}
                dominantBaseline="central"
                style={{ transition: 'all 0.7s ease' }}
            >
                {text}
            </text>
        </svg>
    );
};
