import { cva } from "class-variance-authority";

export const headingVariants = cva("font-manrope scroll-m-20", {
  variants: {
    variant: {
      headerTitle: "text-xl font-semi-bold tracking-[0.453px]",
      large: "text-4xl tracking-[-1px] font-bold capitalize",
      medium: "text-[45px] leading-[52px] font-semibold",
      small: "text-[36px] leading-[44px] font-semibold",
    },
    marginBottom: {
      large: "mb-8",
      medium: "mb-6",
      small: "mb-4",
      none: "mb-0",
    },
  },
  defaultVariants: {
    variant: "medium",
    marginBottom: "none",
  },
});

export const typographyVariants = cva("font-gibson", {
  variants: {
    variant: {
      bodyLarge: "text-[16px] leading-[24px] tracking-[0.5px] font-light",
      bodyMedium: "text-[14px] leading-[20px] tracking-[0.25px] font-light",
      bodySmall: "text-[12px] leading-[16px] font-light",
      tableHeadSmall: "text-[7.5px] leading-[10.5px] tracking-[0.375px] font-bold",
      tableSmall: "text-[9px] leading-[10.5px] tracking-[0.25px] font-light",
      badge: "text-xs leading-[24px] uppercase font-extrabold",
    },
    variantColor: {
      error: "text-destructive",
      warning: "text-yellow-600",
    },
  },
});
