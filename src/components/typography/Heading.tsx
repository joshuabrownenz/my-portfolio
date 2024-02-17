import React from "react";
import { VariantProps } from "class-variance-authority";
import { headingVariants } from ".";

type ComponentType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const mapVariantToComponent: Record<Exclude<VariantProps<typeof headingVariants>["variant"], null | undefined>, ComponentType> = {
  display: "h1",
  headerTitle: "h2",
  large: "h3",
  small: "h4",
};

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof headingVariants> { }

export const Heading: React.FC<HeadingProps> = ({ variant, marginBottom, className, ...props }) => {
  const classNameFromVariant = headingVariants({ variant, marginBottom, className });
  const type = variant ? mapVariantToComponent[variant] : "h6";

  switch (type) {
    case "h1":
      return <h1 className={classNameFromVariant} {...props} />;
    case "h2":
      return <h2 className={classNameFromVariant} {...props} />;
    case "h3":
      return <h3 className={classNameFromVariant} {...props} />;
    case "h4":
      return <h4 className={classNameFromVariant} {...props} />;
    case "h5":
      return <h5 className={classNameFromVariant} {...props} />;
    default:
      return <h6 className={classNameFromVariant} {...props} />;
  }
};
