import React, { FC } from "react";

const HEIGHT = "48px";
const WIDTH = "75px";
export const PlayButton: FC = () => {
    return (
        <button
            aria-label="Play Video: Robot Demo"
            tabIndex={-1}
            type="button"
            className="rounded-lg"
            style={{
                cursor: "pointer",
                height: HEIGHT,
                boxShadow: "none",
                width: WIDTH
            }}
        >
            <div
                className="rounded-lg"
                style={{
                    background: "var(--primary)",
                    display: "block",
                    left: "0px",
                    height: HEIGHT,
                    mixBlendMode: "darken",
                    position: "absolute",
                    top: "0px",
                    width: WIDTH
                }}
            ></div>
            <div
                className="rounded-lg bg-[rgba(15, 23, 42, 0.7)] group-hover:bg-[rgba(35,54,98,0.7)]"
                style={{
                    height: HEIGHT,
                    left: "0px",
                    position: "absolute",
                    top: "0px",
                    transition: "background-color 150ms ease 0s",
                    width: WIDTH
                }}
            ></div>
            <svg
                x="0px"
                y="0px"
                viewBox="0 0 125 80"
                enableBackground="new 0 0 125 80"
                aria-hidden="true"
                style={{
                    fill: "rgb(255, 255, 255)",
                    height: HEIGHT,
                    left: "0px",
                    strokeWidth: "0px",
                    top: "0px",
                    width: "100%",
                    position: "absolute"
                }}
            >
                <rect fillRule="evenodd" clipRule="evenodd" fill="none" width="125" height="80"></rect>
                <polygon fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" points="53,22 53,58 79,40"></polygon>
            </svg>
        </button>
    );

}