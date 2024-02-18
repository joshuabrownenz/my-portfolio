import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { typographyVariants } from ".";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof typographyVariants> { }

export const Typography: React.FC<TypographyProps> = ({
  variant,
  className,
  variantColor,
  ...props
}) => {
  const classNameFromVariant = typographyVariants({
    variant,
    variantColor: variantColor,
    className,
  });
  return <span className={cn(classNameFromVariant)} {...props} />;
};

export interface TypographyPProps extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof typographyVariants> { }

export const TypographyP: React.FC<TypographyPProps> = ({ variant, className, variantColor, ...props }) => {
  const classNameFromVariant = typographyVariants({
    variant,
    variantColor: variantColor,
    className,
  });
  return (
    <p
      className={classNameFromVariant}
      {...props}
    />
  );
};