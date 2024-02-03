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
    <div className={cn("w-full min-h-screen md:h-screen relative")}>
      <div
        className={cn(
          "mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-12 lg:py-0"
        )}
      >
        <div className="md:flex md:justify-between md:gap-4">
          <header
            className={cn(
              "md:sticky md:top-0 md:flex md:max-h-screen md:min-h-screen md:w-1/2 md:flex-col md:justify-between md:py-24"
            )}
          >
            <div>
              <TypographyH1>{pageData.title}</TypographyH1>
              <TypographyH4 className="pt-4">
                {pageData.description}
              </TypographyH4>
              <TypographyP className="pt-2">{pageData.blurb}</TypographyP>
            </div>
            <div className="w-full aspect-square relative md:pr-20">
              <EarthAnimation />
            </div>
            <div>
              <Socials socialLinks={pageData.socialLinks} />
            </div>
          </header>
          <main className={cn("md:w-1/2 md:py-24")}>
            <div>
              {pageData.content.about.content.map((section) => (
                <React.Fragment key={section.title}>
                  <TypographyH4 className="[&:not(:first-child)]:mt-4">
                    {section.title}
                  </TypographyH4>
                  <Separator className="my-2" />
                  <div>
                    {section.content.map((paragraph) => (
                      <TypographyP className="first:mt-1" key={paragraph}>
                        {paragraph}
                      </TypographyP>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="mt-24 flex flex-col gap-4">
              <div>
                <TypographyH4 className="[&:not(:first-child)]:mt-4">
                  Experience
                </TypographyH4>
                <Separator className="my-2" />
              </div>
              {pageData.content.experience.map((section) => (
                <ExperienceCard key={section.company} data={section} />
              ))}
              <div>
                <Link href="/resume.pdf">Download Full Résumé</Link>
              </div>
            </div>

            <div className="mt-24 flex flex-col gap-4">
              <TypographyH4 className="[&:not(:first-child)]:mt-4">
                Projects
              </TypographyH4>
              <Separator />
              {pageData.content.projects.map((project) => (
                <ProjectCard key={project.title} data={project} />
              ))}
            </div>

            <div className="mt-24 flex flex-col gap-4">
              <TypographyH4 className="[&:not(:first-child)]:mt-4">
                Blog Posts
              </TypographyH4>
              <Separator />
              {pageData.content.blogPosts.map((post) => (
                <BlogCard key={post.title} data={post} />
              ))}
            </div>

            <div className="mt-24">
              <TypographyP className="text-sm">
                {pageData.content.credits}
              </TypographyP>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
