import * as React from "react";
import { cn } from "../lib/utils";
import { EarthAnimation } from "@/components/earthAnimation";
import { LabelContainer } from "@/components/label/LabelContainer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectsDialogContent } from "@/components/projectsDialogContent/ProjectsDialogContent";
import { Header } from "@/components/header/Header";
import { MyStoryDialogContent } from "@/components/myStoryDialogContent/MyStoryDialogContent";
import { PageProps, navigate } from "gatsby";
import { CC2URobotVideoAnchorElement, CC2URobotVideoAnchorElementHead } from "@/components/wistaVideo/CC2URobot";
import { ExperienceDialogContent } from "@/components/experienceDialogContent/ExperienceDialogContent";

declare global {
    interface Window {
        _wq: any[];
    }
}

type Section = "my-story" | "experience" | "projects";
const isSection = (section: string): section is Section => ["my-story", "experience", "projects"].includes(section);

export const Index: React.FC<PageProps> = ({ location }) => {
    const hash = location.hash.slice(1);
    const dialogOpen = isSection(hash);

    const [activeTab, setActiveTab] = React.useState<Section | null>(dialogOpen ? hash : null);

    const [hoveredLinkOne, setHoveredLinkOne] = React.useState(false);
    const [hoveredLinkTwo, setHoveredLinkTwo] = React.useState(false);
    const [hoveredLinkThree, setHoveredLinkThree] = React.useState(false);

    /** Raised link determines what links has the highest z index and appears in front of the overlay */
    const [raisedLink, setRaisedLink] = React.useState<Section>("my-story");
    React.useEffect(() => {
        if (hoveredLinkOne) {
            setRaisedLink("projects");
        } else if (hoveredLinkTwo) {
            setRaisedLink("my-story");
        } else if (hoveredLinkThree) {
            setRaisedLink("experience");
        }
    }, [hoveredLinkOne, hoveredLinkTwo, hoveredLinkThree])


    const activeOverlay = dialogOpen || hoveredLinkOne || hoveredLinkTwo || hoveredLinkThree;
    React.useEffect(() => {
        if (isSection(hash)) {
            setActiveTab(hash);
        }
        if (hash === "robot-video") {
            window._wq = window._wq || [];
            window._wq.push({
                id: "_all", onReady: function (video: any) {
                    video.popover.show();
                    video.play();
                }
            });
        }
    }, [hash]);

    React.useEffect(() => {
        window._wq = window._wq || [];
        window._wq.push({
            id: "_all", onReady: function (video: any) {
                video.bind("popoverhide", function () {
                    navigate("#projects")
                })
            }
        });
    }, [])

    const handleOnOpenChange = (open: boolean) => {
        if (!open) {
            navigate("/");
        }
    }

    return (
        <div className={cn("w-full min-h-screen md:max-h-screen md:overflow-hidden")}>
            <Header />
            <main className="relative w-screen h-screen">
                <Dialog open={dialogOpen} onOpenChange={handleOnOpenChange}>
                    <DialogContent className="container">
                        <ProjectsDialogContent className={activeTab !== "projects" ? "hidden" : ""} />
                        <MyStoryDialogContent className={activeTab !== "my-story" ? "hidden" : ""} />
                        <ExperienceDialogContent className={activeTab !== "experience" ? "hidden" : ""} />
                    </DialogContent>
                </Dialog>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "min(120vh, calc(100vw - 300px)) ", height: "60vh" }}>
                    <div className={`absolute ${raisedLink === "projects" ? "z-50" : "z-40"}`} style={{ left: "15%", top: "65%" }}>
                        <a href="/#projects">
                            <LabelContainer angle="left45" text="Projects" textUnderlineLength={100} active={hoveredLinkOne} setActive={setHoveredLinkOne} />
                        </a>
                    </div>
                    <div className={`absolute ${raisedLink === "my-story" ? "z-50" : "z-40"}`} style={{ top: "20%", left: "50%" }}>
                        <a href="/#my-story">
                            <LabelContainer angle="up" text="My Story" lengthAt800={110} active={hoveredLinkTwo} setActive={setHoveredLinkTwo} />
                        </a>
                    </div>
                    <div className={`absolute ${raisedLink === "experience" ? "z-50" : "z-40"}`} style={{ top: "50%", right: "10%" }}>
                        <a href="/#experience">
                            <LabelContainer angle="right45" text="Experience" lengthAt800={90} textUnderlineLength={130} active={hoveredLinkThree} setActive={setHoveredLinkThree} />
                        </a>
                    </div>
                </div>
                <div className={`absolute z-40 h-screen w-screen pointer-events-none transition-all duration-700 ${activeOverlay ? "bg-black/60" : ""}`} />
                <EarthAnimation />
                <CC2URobotVideoAnchorElement />
            </main>

        </div>
    );
}

export function Head() {
    return (
        <>
            <title>Joshua Browne</title>
            <meta name="description" content="Joshua Browne's personal website" />
            <meta name="keywords" content="Joshua Browne, Josh Browne, Software Engineer, Developer, Web Developer, Full Stack Developer, Rust" />
            <CC2URobotVideoAnchorElementHead />
        </>
    )
}

export default Index;