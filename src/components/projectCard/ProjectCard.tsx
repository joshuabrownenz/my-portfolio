import React, { FC, ReactNode } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Project, ProjectImage } from "@/types";
import { StaticImage } from "gatsby-plugin-image";
import { Heading, Typography } from "../typography";
import { Link } from "gatsby";
import { ArrowUpRight } from "lucide-react";
import { FakeLink } from "../fakeLink/FakeLink";
import { IStaticImageProps } from "gatsby-plugin-image/dist/src/components/static-image.server";

type ProjectCardProps = {
  project: Project;
};

type ProjectImageProps = Omit<IStaticImageProps, "src" | "width"> & {
  type: ProjectImage;
}

const ProjectStaticImage: FC<ProjectImageProps> = ({ type, ...props }) => {
  switch (type) {
    case "cc2u-website":
      return <StaticImage src="../../images/CC2U-website.png" className="w-full rounded-3xl" width={544} alt="Coffee Capsules 2U Website" />
    case "cc2u-robot":
      return <StaticImage src="../../images/CC2U-robot.jpg" className="w-full rounded-3xl" width={544} alt="Robot in our Factory" />
    case "rust-db":
      return <StaticImage src="../../images/Rust.png" className="bg-white w-full rounded-3xl" width={544} alt="Rust Logo" />
  }

}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a href={project.url} target="_blank" >
      <Card className="max-w-[544px] h-full flex flex-col justify-between">
        <div>
          <ProjectStaticImage type={project.thumbnail} alt={project.title} />
          <CardHeader className="w-full">
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
        </div>
        <CardFooter>
          <div className="flex flex-wrap gap-3 items-center h-full">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Typography variant="badge">
                  {tag}
                </Typography>
              </Badge>
            ))}
            <FakeLink>
              VIEW PROJECT
            </FakeLink>
          </div>
        </CardFooter>
      </Card>
    </a >
  );
};
