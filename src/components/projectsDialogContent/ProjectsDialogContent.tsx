import React, { FC } from "react"
import { Project } from "@/types";
import { ProjectCard } from "../projectCard/ProjectCard";
import { Heading } from "../typography";
import { PAGE_DATA } from "@/constants";


type ProjectsDialogContentProps = {
    className?: string;
}

export const ProjectsDialogContent: FC<ProjectsDialogContentProps> = ({ className }) => {
    const projectsOnPage = PAGE_DATA.projects.slice(0, 3);
    return (
        <div className={className}>
            <Heading variant={"large"}>
                Featured Projects
            </Heading>
            <div className="flex gap-11 h-min">
                {projectsOnPage.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </div>
    )
}