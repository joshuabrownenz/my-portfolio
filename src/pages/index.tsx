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
import { Header } from "@/components/header/Header";
import { MyStoryDialogContent } from "@/components/myStoryDialogContent/MyStoryDialogContent";

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
            <Header />
            <main className="aspect-[4/3] relative">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="container">
                        {activeTab === "projects" && <ProjectsDialogContent projects={PAGE_DATA.projects} />}
                        {activeTab === "my-story" && <MyStoryDialogContent />}
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
