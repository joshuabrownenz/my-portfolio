import * as React from "react";
import { cn } from "../lib/utils";
import {
    TypographyH1,
    TypographyH4,
    TypographyP,
} from "@/components/ui/typography";
import { EarthAnimation } from "@/components/earthAnimation";
import { LabelContainer } from "@/components/label/LabelContainer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PAGE_DATA } from "@/constants";
import { ProjectsDialogContent } from "@/components/projectsDialogContent/ProjectsDialogContent";

type Section = "my-story" | "experience" | "projects";

export default function Index() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<Section | null>(null);

    const handleClick = (tab: Section) => {
        setActiveTab(tab);
        setDialogOpen(true);
    }

    return (
        <div className={cn("w-full min-h-screen md:max-h-screen md:overflow-hidden")}>

            <header
                className={cn(
                    "w-full flex items-center justify-center text-center md:flex-col md:pt-24"
                )}
            >
                <div>
                    <TypographyH1>{PAGE_DATA.title}</TypographyH1>
                    <TypographyH4 className="pt-4">
                        {PAGE_DATA.description}
                    </TypographyH4>
                    <TypographyP className="pt-2">{PAGE_DATA.blurb}</TypographyP>
                </div>
            </header>

            <main className="aspect-[4/3] relative">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="container">
                        {activeTab === "projects" && <ProjectsDialogContent projects={PAGE_DATA.projects}/>}
                    </DialogContent>
                </Dialog>

                <div className="absolute z-50" style={{ left: "25%", top: "25%" }}>
                    <LabelContainer angle="left45" text="Projects" onClick={() => handleClick("projects")} />
                </div>
                <div className="absolute z-50" style={{ left: "45%" }}>
                    <LabelContainer angle="up" text="My Story" onClick={() => handleClick("my-story")} />
                </div>
                <div className="absolute z-50" style={{ top: "15%", right: "25%" }}>
                    <LabelContainer angle="right45" text="Experience" onClick={() => handleClick("experience")} />
                </div>
                <EarthAnimation />
            </main>

        </div>
    );
}
