import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { headingVariants } from ".";

type ComponentType = "h1" | "h2" | "h3";

const mapVariantToComponent: Record<Exclude<VariantProps<typeof headingVariants>["variant"], null | undefined>, ComponentType> = {
  large: "h1",
  headerTitle: "h2",
  medium: "h2",
  small: "h3",
};

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

export const Heading: React.FC<HeadingProps> = ({ variant, marginBottom, className, ...props }) => {
  const classNameFromVariant = headingVariants({ variant, marginBottom, className });
  const type = variant ? mapVariantToComponent[variant] : "h6";

  switch (type) {
    case "h1":
      return <h1 className={classNameFromVariant} {...props} />;
    case "h2":
      return <h2 className={classNameFromVariant} {...props} />;
    case "h3":
      return <h3 className={cn(classNameFromVariant)} {...props} />;
  }
};
