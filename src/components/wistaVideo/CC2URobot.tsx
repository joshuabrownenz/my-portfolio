import React, { FC } from "react"

export const CC2URobotVideoAnchorElementHead = () => {
    return (
        <>
            <script src="https://fast.wistia.com/embed/medias/0j68w1e4ch.jsonp" async></script>
            <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
        </>
    )
}


export const CC2URobotVideoAnchorElement: FC = () => {
    return <span className="wistia_embed wistia_async_0j68w1e4ch popover=true popoverContent=link videoFoam=false" style={{ display: "inline-block", }}></span>


}