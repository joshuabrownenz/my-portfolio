import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { PageData } from "../types";
import { SiCredly } from "react-icons/si";

export const PAGE_DATA: PageData = {
  title: "Joshua Browne",
  description: "Fullstack Developer | Future Software Engineer",
  myStory: {
    blurb: "I build fast, powerful and interesting software",
    title:
      "I'm a Software Engineer based in Auckland, New Zealand.",
    paragraph1: `My passion for software started when I was intermediate. It started simple with small python project then embedded projects on Arduino and custom circuit boards. After a while I moved to C# with Unity and that is where I realised anything is possible with code.`,
    paragraph2: `After graduating High School a year early with NCEA level 3. I was hired that summer by Cam at Coffee Capsules 2U where I was meant to just work for the summer on their new robotics project.`,
    paragraph3: `I must have done something right cause I'm still here 3 years later. Working with Cam has given me so many opportunities to explore different aspects of software.`,
    paragraph4: `I started with the Automation project. Building integrations with every type of hardware imaginable. The UR-10e itself, custom handwriting machines, camera's galore, pneumatic systems, actuators, motors and every sensor imaginable. It was the highlight of my career, the amount of learning tinkering and problem solving was incredible!`,
    paragraph5: `After that, I moved on to managing the CC2U website and building new features and improvements improving my Web Development skills`,
    paragraph6: "Now I'm contracting for Woop Ltd and working on a new highly exciting process automation project.",
  },
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
