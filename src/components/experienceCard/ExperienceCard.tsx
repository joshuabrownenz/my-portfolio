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
    <Card className="max-w-[544px] h-full flex flex-col justify-between">
      <CardHeader className="w-full">
        <CardDescription>{job.timeline}</CardDescription>
        <CardTitle>{job.company}</CardTitle>
        <Heading variant="small">{job.role}</Heading>
      </CardHeader>
      <CardContent>
        <TypographyP>{job.body}</TypographyP>
      </CardContent>
    </Card>
  );
};
