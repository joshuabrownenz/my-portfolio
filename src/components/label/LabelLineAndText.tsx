// LabelLineAndText.tsx
import React from 'react';
import './Label.css';

type LabelLineAndTextProps = {
    active: boolean;
    angle: 'up' | 'left45' | 'right45';
    length: number; // Length of the line
    text: string;
};

export const LabelLineAndText: React.FC<LabelLineAndTextProps> = ({ active, angle, length, text }) => {
    const lineStyle = {
        height: `${length}px`, // Variable length
        transform: `rotate(${angle === 'up' ? '0' : angle === 'left45' ? '-45deg' : '45deg'}) ${active ? `scaleY(1.5)` : ""}`,
    };

    const textStyle = {
        bottom: `${angle === 'up' ? `${length}px` : `${length / Math.sqrt(2)}px`}`, // Adjust based on your need
        left: `${angle === 'up' ? '50%' : angle === "right45" ? `${length / Math.sqrt(2)}px` : ""}`,
        right: angle === "left45" ? `${length / Math.sqrt(2)}px` : "",

        transform: angle === "up" ?
            `${active ? `translate(-50%, -${length / 2}px)` :
                'translate(-50%)'}` : angle === "right45" ? active ?
                    `translate(${length / Math.sqrt(2) / 2}px, -${length / Math.sqrt(2) / 2}px)` : "" :
                active ?
                    `translate(-${length / Math.sqrt(2) / 2}px, -${length / Math.sqrt(2) / 2}px)` : "",
    };

    const lineHorizontalStyle = {
        width: `${length * 2}px`,
        bottom: textStyle.bottom,
        left: angle === "right45" ? `${length / Math.sqrt(2)}px` : undefined,
        right: angle === "left45" ? `${length / Math.sqrt(2)}px` : undefined,
        transform: active ?
            angle === "right45" ?
                `translate(${(length / Math.sqrt(2)) / 2}px, -${(length / Math.sqrt(2)) / 2}px)` : `translate(-${(length / Math.sqrt(2)) / 2}px, -${(length / Math.sqrt(2)) / 2}px)` : ""
    }

    return (
        <div className="label-line-and-text " style={{ position: 'absolute', bottom: '16px' }}>
            <div className="label-line transition-all duration-700" style={lineStyle}></div>
            {angle !== 'up' &&
                <div className="label-line-horizontal transition-all duration-700" style={lineHorizontalStyle}></div>}
            <div className="label-text transition-all duration-700" style={textStyle}>{text}</div>
        </div>
    );
};
