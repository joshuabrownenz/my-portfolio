import React, { FC } from "react"
import { DialogHeader } from "../ui/dialog"
import { Project } from "@/types";
import { ProjectCard } from "../projectCard/ProjectCard";
import { Heading } from "../typography";


type ProjectsDialogContentProps = {
    projects: Project[];
}

export const ProjectsDialogContent: FC<ProjectsDialogContentProps> = ({ projects }) => {
    const projectsOnPage = projects.slice(0, 3);
    return (
        <>
            <Heading variant={"large"}>
                Featured Projects
            </Heading>
            <div className="flex gap-11">
                {projectsOnPage.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </>
    )
}