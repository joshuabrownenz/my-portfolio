import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { PageData } from "../types";
import { SiCredly } from "react-icons/si";

export const PAGE_DATA: PageData = {
  title: "Joshua Browne",
  description: "Fullstack Developer | Future Software Engineer",
  myStory: {
    blurb: "I build fast, powerful and interesting software",
    title: "I'm a Software Engineer based in Auckland, New Zealand.",
    column1: [
      "My passion for software started when I was intermediate. It started simple with small python project then embedded projects on Arduino and custom circuit boards. After a while I moved to C# with Unity and that is where I realised anything is possible with code.",
      "After graduating High School a year early. I was hired that summer by Simply Coffee Ltd where I was meant to work for a couple of weeks on their new robotics project.",
    ],
    column2: [
      "I must have done something right cause I'm still here 3 years later. Working with Simply Coffee Ltd has given me so many opportunities to explore different aspects of software.",
      "I've built integrations with every type of hardware imaginable. The Robot (UR-10e), custom handwriting machines, camera's galore, pneumatic systems, actuators, motors and every sensor imaginable. It was the highlight of my career, the amount of learning tinkering and problem solving was incredible!",
      "After that, I moved on to managing the CC2U website and building new features and improvements improving my Web Development skills",
      "Now I'm contracting for Woop Ltd and working on a new highly exciting process automation project.",
    ],
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

  experience: {
    quote: {
      body: "The only source of knowledge is experience.",
      by: "Albert Einstein",
    },
    jobs: [
      {
        company: "Simply Coffee Ltd",
        role: "Software Engineer",
        body: "I initially started as a Robotics Engineer, building them a end-to-end order fulfillment robot. I then moved on to managing the CC2U website and building new features and improvements. Currently, I am on standby and perform regular maintenance and updates to the robot and website.",
        timeline: "2020 - Ongoing",
      },
      {
        company: "DDSIT",
        role: "SRE Engineer (Intern)",
        body: "I worked part-time for DDSIT under an incredibly talented team. I was mainly responsible for helping DDSIT achieve their certification, education and training goals. In my time there DDSIT reached their Microsoft solution partner status.  ",
        timeline: "Feb 2023 - Jul 2023",
      },
      {
        company: "Woop Ltd",
        role: "Software Engineer",
        body: "I'm also a freelance developer, working with a variety of clients to build websites and web applications.",
        timeline: "Dec 2023 - Ongoing",
      },
    ],
  },
  projects: [
    {
      title: "Coffee Capsules 2U Website",
      description:
        "I am the active developer on the Coffee Capsules 2U website. I have implemented a number of features and improvements to the website, including a new cart system, shopify discount codes and a new product page",
      url: "https://www.coffeecapsules2u.co.nz",
      thumbnail: "cc2u-website",
      tags: ["React", "E-commerce"],
    },
    {
      title: "Robotic Order Fulfillment",
      description:
        "I designed and built this robot for Simply Coffee Ltd to end-to-end pack and fulfill orders. The robot is capable of case erecting, product picking and packing, and case sealing and palletising. It uses a UR-10e Collaborative Robot, Python for orchestration, and Universal Robots proprietary language URScript.",
      url: "#robot-video",
      thumbnail: "cc2u-robot",
      tags: ["Robotics", "Automation"],
      hideFakeLink: true,
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
