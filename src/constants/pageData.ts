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
      "My passion for software started when I was young. My highschool life was spent building 3D printers, drones and building games in Unity. That is I where I discovered anything is possible with code.",
      "My programming knowledge is self-taught through projects, experiments and online courses. Supplemented with my Software Engineering Degree I am undertaking at the University of Auckland.",
    ],
    column2: [
      "After completing NCEA level 3 a year early. I was hired by Simply Coffee Ltd to automate their order fufillment system. Cam, the owner, gave me the space to experiment, tinker and solve a diverse set of engineering challenges.",
      "In my free time I love adventuring, tramping, mountaineering, scuba diving and surfing. Being outdoors and setting myself personal challenges make me feel alive. Spending time with friends and family is a must.",
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
        company: "DDS IT",
        role: "SRE Engineer (Intern)",
        body: "I worked part-time for DDS IT under an incredibly talented team. I was mainly responsible for helping DDS IT achieve their certification, education and training goals. In my time there DDS IT reached their Microsoft solution partner status.",
        timeline: "Feb 2023 - Jul 2023",
      },
      {
        company: "Woop Ltd",
        role: "Software Engineer",
        body: "I am working with Woop to develop a new Central Operations System. Working with a Senior Developer, we are automating and simplifying the process of procuring products, communicating with suppliers, managing inventory and providing actionable insights into their business.",
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
      tags: ["Robotics", "Python"],
      linkText: "Watch Video",
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
