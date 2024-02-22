import { cva } from "class-variance-authority";

export const headingVariants = cva("font-manrope scroll-m-20", {
  variants: {
    variant: {
      display: "text-4xl font-semibold",
      headerTitle: "text-xl font-semi-bold tracking-[0.453px]",
      large: "text-4xl tracking-[-1px] font-bold capitalize",
      small: "text-2xl font-semibold",
      xSmall: "text-lg font-semibold text-muted-foreground",
    },
    marginBottom: {
      large: "mb-8",
      medium: "mb-6",
      small: "mb-4",
      none: "mb-0",
    },
  },
  defaultVariants: {
    variant: "large",
    marginBottom: "none",
  },
});

export const typographyVariants = cva("font-gibson", {
  variants: {
    variant: {
      myStoryBody: "md:text-sm xl:text-base text-muted-foreground",
      body: " md:text-sm lg:text-base text-muted-foreground",
      badge: "text-xs leading-[24px] uppercase font-extrabold",
    },
    variantColor: {
      error: "text-destructive",
      warning: "text-yellow-600",
    },
  },
});
