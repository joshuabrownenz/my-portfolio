import { IconType } from "react-icons";

export type PageData = {
  title: string;
  description: string;
  myStory: MyStory;
  socialLinks: SocialLink[];
  experience: {
    quote: Quote;
    jobs: Experience[];
  };
  projects: Project[];
};

export type MyStory = {
  blurb: string;
  title: string;
  column1: string[];
  column2: string[];
}

export type SocialLink = {
  url: string;
  title: string;
  ariaLabel: string;
  icon: IconType;
};

export type Quote = {
  body: string;
  by: string;
};

export type Experience = {
  company: string;
  role: string;
  body: string;
  timeline: string;
};

export type ProjectImage = "cc2u-website" | "cc2u-robot" | "rust-db";

export type Project = {
  title: string;
  description: string;
  url: string;
  thumbnail: ProjectImage;
  tags: string[];
  hideFakeLink?: boolean;
};
