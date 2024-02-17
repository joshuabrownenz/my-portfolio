import * as React from "react";
import { cn } from "../lib/utils";
import { EarthAnimation } from "@/components/earthAnimation";
import { LabelContainer } from "@/components/label/LabelContainer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PAGE_DATA } from "@/constants";
import { ProjectsDialogContent } from "@/components/projectsDialogContent/ProjectsDialogContent";
import { Header } from "@/components/header/Header";
import { MyStoryDialogContent } from "@/components/myStoryDialogContent/MyStoryDialogContent";
import { PageProps, navigate } from "gatsby";

type Section = "my-story" | "experience" | "projects";
const isSection = (section: string): section is Section => ["my-story", "experience", "projects"].includes(section);

export const Index: React.FC<PageProps> = ({ location }) => {
    const hash = location.hash.slice(1);
    const dialogOpen = isSection(hash);

    const [activeTab, setActiveTab] = React.useState<Section | null>(dialogOpen ? hash : null);
    console.log("activeTab", activeTab);
    React.useEffect(() => {
        if (isSection(hash)) {
            setActiveTab(hash);
        }
    }, [hash]);

    const handleOnOpenChange = (open: boolean) => {
        if (!open) {
            navigate("/");
        }
    }

    return (
        <div className={cn("w-full min-h-screen md:max-h-screen md:overflow-hidden")}>
            <Header />
            <main className="aspect-[4/3] relative">
                <Dialog open={dialogOpen} onOpenChange={handleOnOpenChange}>
                    <DialogContent className="container">
                        {activeTab === "projects" && <ProjectsDialogContent projects={PAGE_DATA.projects} />}
                        {activeTab === "my-story" && <MyStoryDialogContent />}
                    </DialogContent>
                </Dialog>
                <div className="absolute z-50" style={{ left: "25%", top: "25%" }}>
                    <a href="/#projects">
                        <LabelContainer angle="left45" text="Projects" />
                    </a>
                </div>
                <div className="absolute z-50" style={{ left: "45%" }}>
                    <a href="/#my-story">
                        <LabelContainer angle="up" text="My Story" />
                    </a>
                </div>
                <div className="absolute z-50" style={{ top: "15%", right: "25%" }}>
                    <a href="/#experience">
                        <LabelContainer angle="right45" text="Experience" />
                    </a>
                </div>
                <EarthAnimation />
            </main>

        </div>
    );
}

export default Index;