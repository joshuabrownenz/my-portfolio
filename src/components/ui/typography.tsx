import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

type TypographyProps = HTMLAttributes<HTMLHeadingElement>;

export const TypographyH1: FC<TypographyProps> = ({ className, ...props }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  );
};
export const TypographyH2: FC<TypographyProps> = ({ className, ...props }) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  );
};
export const TypographyH3: FC<TypographyProps> = ({ className, ...props }) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};
export const TypographyH4: FC<TypographyProps> = ({ className, ...props }) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-normal tracking-tight",
        className
      )}
      {...props}
    />
  );
};
export const TypographyP: FC<TypographyProps> = ({ className, ...props }) => {
  return (
    <p
      className={cn("text-muted-foreground font-normal leading-7 [&:not(:first-child)]:mt-4", className)}
      {...props}
    />
  );
};