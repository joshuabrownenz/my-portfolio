import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/MangoGrotesque-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="MangoGrotesque"
    />,
    <link
      rel="preload"
      href="/bump.jpg"
      as="image"
      crossOrigin="anonymous"
      key="Earth"
    />,
  ]);
};
