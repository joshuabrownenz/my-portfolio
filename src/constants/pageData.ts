import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { PageData } from "../types";
import { SiCredly } from "react-icons/si";

export const PAGE_DATA: PageData = {
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
      description: "A self implemented database in Rust. This project taught me about the underlying principles of databases. Implementing B-Trees, managing pages and soon to have a basic query language.",
      url: "https://www.coffeecapsules2u.co.nz",
      thumbnailUrl: "/CC2U-Image.png",
      tags: ["Rust", "Database"],
    },
    {
      title: "Database From Scratch",
      description: "A self implemented database in Rust. This project taught me about the underlying principles of databases. Implementing B-Trees, managing pages and soon to have a basic query language.",
      url: "https://www.coffeecapsules2u.co.nz",
      thumbnailUrl: "/CC2U-Image.png",
      tags: ["Rust", "Database"],
    },
    {
      title: "Database From Scratch",
      description: "A self implemented database in Rust. This project taught me about the underlying principles of databases. Implementing B-Trees, managing pages and soon to have a basic query language.",
      url: "https://www.coffeecapsules2u.co.nz",
      thumbnailUrl: "/CC2U-Image.png",
      tags: ["Rust", "Database"],
    },
  ],
};
