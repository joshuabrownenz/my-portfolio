import React from "react";
import { Typography } from "../typography";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FakeLinkProps = React.HTMLAttributes<HTMLDivElement>;

/** Looks like a link but doesn't use the link component*/
export const FakeLink: React.FC<FakeLinkProps> = ({ children, className, ...props }) => (
    <div className={cn("flex min-[430px]:px-2.5 min-[430px]:gap-1 lg:max-2xl:px-2.5 lg:max-2xl:gap-1 items-center", className)} {...props}>
        <Typography variant="badge" className="group-hover:underline underline-offset-4 max-[430px]:text-[10px] lg:max-2xl:text-[11px]">
            {children}
        </Typography>
        <ArrowUpRight className="w-4 h-4" />
    </div>
)