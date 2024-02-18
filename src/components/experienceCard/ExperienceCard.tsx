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
import { TypographyP } from "../typography";

type ExperienceCard = {
  company: string;
  role: string;
  description: string;
  tags: string[];

  start: string;
  end: string;
};

type ExperienceCardProps = {
  data: ExperienceCard;
};

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ data }) => {
  return (
    <Card className="flex">
      <CardHeader className="pr-0">
        <TypographyP>
          {data.start} - {data.end}
        </TypographyP>
      </CardHeader>
      <div className="[&>]:pl-0">
        <CardHeader>
          <CardTitle>{data.company}</CardTitle>
          <CardDescription>{data.role}</CardDescription>
        </CardHeader>
        <CardContent>
          <TypographyP>{data.description}</TypographyP>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
