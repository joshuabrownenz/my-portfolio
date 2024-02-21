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
            <div className="flex gap-11 h-min">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-6">
                        <Heading variant={"display"} className="whitespace-pre-wrap">
                            {quote.body}
                        </Heading>
                    </div>
                    -{quote.by}
                </div>
                {jobs.map((job) => (
                    <ExperienceCard key={job.company} job={job} />
                ))}
            </div>
        </div>
    )
}
