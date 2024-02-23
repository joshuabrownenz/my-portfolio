import React from "react";
import { GatsbySSR } from "gatsby";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
}) => {
  const link = React.createElement("link", {
    rel: "preload",
    href: "/fonts/MangoGrotesque-Bold.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
    key: "MangoGrotesque",
  });

  const earth = React.createElement("link", {
    rel: "preload",
    href: "/points",
    as: "fetch",
    type: "font/woff2",
    crossOrigin: "anonymous",
    key: "Earth",
  });

  setHeadComponents([link, earth]);
};
