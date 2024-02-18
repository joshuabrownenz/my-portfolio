import React, { FC } from "react"
import { Project } from "@/types";
import { ProjectCard } from "../projectCard/ProjectCard";
import { Heading } from "../typography";


type ProjectsDialogContentProps = {
    className?: string;
    projects: Project[];
}

export const ProjectsDialogContent: FC<ProjectsDialogContentProps> = ({ className, projects }) => {
    const projectsOnPage = projects.slice(0, 3);
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