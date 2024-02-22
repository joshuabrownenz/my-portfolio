import React, { FC } from "react"
import { Project } from "@/types";
import { ProjectCard } from "../projectCard/ProjectCard";
import { Heading } from "../typography";
import { PAGE_DATA } from "@/constants";
import { ExperienceCard } from "../experienceCard/ExperienceCard";


type ExperienceDialogContentProps = {
    className?: string;
}

export const ExperienceDialogContent: FC<ExperienceDialogContentProps> = ({ className }) => {
    const { quote, jobs } = PAGE_DATA.experience;
    return (
        <div className={className}>
            <Heading className="" variant={"large"}>
                Experience
            </Heading>
            <div className="mt-8 flex gap-2 ml-[-16px]">
                <div className="w-full flex flex-col flex-col-reverse md:grid md:grid-cols-3 gap-2">
                    {jobs.map((job) => (
                        <ExperienceCard key={job.company} job={job} />
                    ))}
                </div>
            </div>
        </div>
    )
}