import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TypographyP } from "../ui/typography";
import { Badge } from "../ui/badge";
import { FaExternalLinkAlt } from "react-icons/fa";

type ProjectCard = {
  title: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  tags: string[];
};

type ProjectCardProps = {
  data: ProjectCard;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  return (
    <a href={data.url} target="_blank">
      <Card className="flex relative s">
        <div className="w-4 h-4 absolute top-2 right-2">
          <FaExternalLinkAlt />
        </div>

        <div>
          <CardHeader className="pr-0 flex h-full justify-center items-center">
            <img src={data.thumbnailUrl} alt={data.title} className="w-32" />
          </CardHeader>
        </div>
        <div>
          <CardHeader className="w-full">
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>{data.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </div>
      </Card>
    </a>
  );
};
