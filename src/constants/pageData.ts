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
      title: "Coffee Capsules 2U",
      description:
        "I am the active developer on the Coffee Capsules 2U website. I have implemented a number of features and improvements to the website, including a new cart system, shopify discount codes and a new product page",
      url: "https://www.coffeecapsules2u.co.nz",
      thumbnail: "cc2u-website",
      tags: ["React", "E-commerce"],
    },
    {
      title: "Robotic Order Fulfillment",
      description:
        "I designed and built this robot for Coffee Capsules 2U to end-to-end pack and fulfill orders. The robot is capable of case erecting, product picking and packing, and case sealing and palletising. It has a pack rate of 50 cases per hour. It uses a UR-10e Collaborative Robot, Python for orchestration, and a proprietary language UR-Script.",
      url: "cc2u-robot",
      thumbnail: "cc2u-robot",
      tags: ["Robotics", "Automation"],
    },
    {
      title: "Database From Scratch",
      description:
        "A self implemented database in Rust. This project taught me about the underlying principles of databases. Implementing B-Trees, managing pages and soon to have a basic query language.",
      url: "https://github.com/joshuabrownenz/database-from-scratch",
      thumbnail: "rust-db",
      tags: ["Rust", "Database"],
    },
  ],
};
