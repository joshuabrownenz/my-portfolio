import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Project } from "@/types";
import { StaticImage } from "gatsby-plugin-image";
import { Heading, Typography } from "../typography";
import { Link } from "gatsby";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a href={project.url} target="_blank">
      <Card className="max-w-[544px]">
        <StaticImage src={"../../images/CC2U-Image.png"} className="w-full rounded-3xl" alt={project.title} width={544} />
        <CardHeader className="w-full">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex flex-wrap gap-3 items-center">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Typography variant="badge">
                  {tag}
                </Typography>
              </Badge>
            ))}
            <div className="flex px-2.5 gap-1 items-center">
              <Typography variant="badge" className="group-hover:underline underline-offset-4">
                VIEW PROJECT
              </Typography>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};
