import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Heading, TypographyP } from "../typography";
import { Experience } from "@/types";
import { Header } from "../header/Header";

type ExperienceCardProps = {
  job: Experience;
};

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ job }) => {
  return (
    <Card className="max-w-[544px] flex-1 h-full flex flex-col">
      <CardHeader className="w-full pt-0 pb-2">
        <CardDescription>{job.timeline}</CardDescription>
        <CardTitle>{job.company}</CardTitle>
        <Heading variant="xSmall">{job.role}</Heading>
      </CardHeader>
      <CardContent className="">
        <TypographyP className="" variant={"body"}>{job.body}</TypographyP>
      </CardContent>
    </Card>
  );
};
