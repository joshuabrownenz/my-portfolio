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
import { Typography } from "../typography";
import { FakeLink } from "../fakeLink/FakeLink";
import { IStaticImageProps } from "gatsby-plugin-image/dist/src/components/static-image.server";
import { PlayButton } from "../playButton/PlayButton";

type ProjectCardProps = {
  project: Project;
};

type ProjectImageProps = Omit<IStaticImageProps, "src" | "width"> & {
  type: ProjectImage;
}

const ProjectStaticImage: FC<ProjectImageProps> = ({ type, ...props }) => {
  switch (type) {
    case "cc2u-website":
      return <StaticImage src="../../images/CC2U-website.png" className="w-full rounded-3xl" alt="Simply Coffee Ltd Website" />
    case "cc2u-robot":
      return <div className="relative">
        <StaticImage src="../../images/CC2U-robot.png" className="w-full rounded-3xl" alt="Robot in our Factory" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <PlayButton />
        </div>
      </div>
    case "rust-db":
      return <StaticImage src="../../images/Rust.png" className="bg-white w-full rounded-3xl" alt="Rust Logo" />
  }

}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a className="flex-grow basis-0" href={project.url} target={project.thumbnail !== "cc2u-robot" ? "_blank" : undefined}>
      <Card className="h-full flex flex-col justify-between">
        <div>
          <ProjectStaticImage type={project.thumbnail} alt={project.title} />
          <CardHeader className="w-full">
            <CardTitle>{project.title}</CardTitle>
            <CardDescription className="lg:text-xs xl:text-xs 2xl:text-sm">{project.description}</CardDescription>
          </CardHeader>
        </div>
        <CardFooter className="flex justify-between">
          <div className="flex flex-wrap gap-1 min-[430px]:gap-3 lg:max-2xl:gap-1 items-center h-full">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Typography className="max-[430px]:text-[10px] lg:max-2xl:text-[10px] font-semibold" variant="badge">
                  {tag}
                </Typography>
              </Badge>
            ))}
          </div>
          {!project.hideFakeLink && <FakeLink className="">
            {project.linkText || "VIEW PROJECT"}
          </FakeLink>}
        </CardFooter>
      </Card>
    </a >
  );
};
