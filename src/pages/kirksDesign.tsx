import * as React from "react";
import { cn } from "../lib/utils";
import {
    TypographyH1,
    TypographyH3,
    TypographyH4,
    TypographyP,
} from "@/components/ui/typography";
import { Socials } from "@/components/socials";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiCredly } from "react-icons/si";
import { ExperienceCard } from "@/components/experienceCard/ExperienceCard";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/ui/link";
import { ProjectCard } from "@/components/projectCard/ProjectCard";
import { BlogCard } from "@/components/blogCard/BlogCard";
import { EarthAnimation } from "@/components/earthAnimation";
import { NavMenu } from "@/components/navMenu";
import { LabelDot } from "@/components/label/LabelDot";
import { Label } from "@/components/ui/label";
import { LabelContainer } from "@/components/label/LabelContainer";

const pageData = {
    title: "Joshua Browne",
    description: "Fullstack Developer | Future Software Engineer",
    blurb: "I build fast, powerful and interesting software",
    socialLinks: [
        {
            url: "https://www.github.com/joshuabrownenz",
            title: "GitHub",
            ariaLabel: "GitHub (opens in a new tab)",
            icon: FaGithub,
        },
        {
            url: "https://www.linkedin.com/in/joshuabrownenz",
            title: "LinkedIn",
            ariaLabel: "LinkedIn (opens in a new tab)",
            icon: FaLinkedin,
        },
        {
            url: "https://www.instagram.com/joshuabrownenz",
            title: "Instagram",
            ariaLabel: "Instagram (opens in a new tab)",
            icon: FaInstagram,
        },
        {
            url: "https://www.credly.com/users/joshuabrownenz/badges",
            title: "Credly",
            ariaLabel: "Credly (opens in a new tab)",
            icon: SiCredly,
        },
    ],
    content: {
        about: {
            title: "About Me",
            content: [
                {
                    title: "Who am I?",
                    content: [
                        "I'm a fullstack developer and future software engineer based in Auckland, New Zealand.",
                        "I'm currently studying a Bachelor of Computer and Information Sciences at AUT University.",
                    ],
                },
                {
                    title: "What do I do?",
                    content: [
                        "I'm currently working as a fullstack developer at a small startup called <a href='https://www.livewirehr.co.nz' target='_blank'>LivewireHR</a>.",
                        "I'm also a freelance developer, working with a variety of clients to build websites and web applications.",
                    ],
                },
                {
                    title: "What am I doing?",
                    content: [
                        "I'm currently working on a few projects, including a new website for a local business, a new website for a local charity, and a new website for a local church.",
                    ],
                },
            ],
        },
        experience: [
            {
                company: "LivewireHR",
                role: "Fullstack Developer",
                description:
                    "I'm currently working as a fullstack developer at a small startup called LivewireHR.",
                tags: ["React", "Node.js", "TypeScript", "MongoDB"],
                start: "2020",
                end: "Present",
            },
            {
                company: "Freelance",
                role: "Fullstack Developer",
                description:
                    "I'm also a freelance developer, working with a variety of clients to build websites and web applications.",
                tags: ["React", "Node.js", "TypeScript", "MongoDB"],
                start: "2020",
                end: "Present",
            },
            {
                company: "Freelance",
                role: "Fullstack Developer",
                description:
                    "I'm also a freelance developer, working with a variety of clients to build websites and web applications.",
                tags: ["React", "Node.js", "TypeScript", "MongoDB"],
                start: "2020",
                end: "Present",
            },
        ],

        projects: [
            {
                title: "Database From Scratch",
                description: "A self implemented database in Rust",
                url: "https://www.coffeecapsules2u.co.nz",
                thumbnailUrl: "https://via.placeholder.com/200x150",
                tags: ["Rust", "Database"],
            },
            {
                title: "Database From Scratch",
                description: "A self implemented database in Rust",
                url: "https://www.coffeecapsules2u.co.nz",
                thumbnailUrl: "https://via.placeholder.com/200x150",
                tags: ["Rust", "Database"],
            },
        ],

        blogPosts: [
            {
                title: "Stuggles with AWS Lambda",
                date: "2023",
                thumbnailUrl: "https://via.placeholder.com/200x150",
                url: "/blog/stuggles-with-aws-lambda",
            },
        ],

        credits:
            "Built with Gatsby.js, Shadcn/ui and Tailwind CSS, deployed with Netlify. All text is set in the Inter typeface.",
    },
};

export default function Index() {
    return (
        <div className={cn("w-full min-h-screen md:max-h-screen md:overflow-hidden")}>

            <header
                className={cn(
                    "w-full flex items-center justify-center text-center md:flex-col md:pt-24"
                )}
            >
                <div>
                    <TypographyH1>{pageData.title}</TypographyH1>
                    <TypographyH4 className="pt-4">
                        {pageData.description}
                    </TypographyH4>
                    <TypographyP className="pt-2">{pageData.blurb}</TypographyP>
                </div>
            </header>
            <main className="aspect-[4/3] relative">
                <div className="absolute z-50" style={{ left: "25%", top: "25%" }}>
                    <LabelContainer angle="left45" text="Projects" />
                </div>
                <div className="absolute z-50" style={{left: "45%"}}>
                    <LabelContainer angle="up" text="My Story"  />
                </div>
                <div className="absolute z-50" style={{ top: "15%", right: "25%" }}>
                    <LabelContainer angle="right45" text="Experience" />
                </div>
                <EarthAnimation />
            </main>

        </div>
    );
}
