import { IconType } from "react-icons";

export type PageData = {
  title: string;
  description: string;
  blurb: string;
  socialLinks: SocialLink[];
  experience: Experience[];
  projects: Project[];
};

export type SocialLink = {
  url: string;
  title: string;
  ariaLabel: string;
  icon: IconType;
};

export type Experience = {
  company: string;
  role: string;
  description: string;
  tags: string[];
  start: string;
  end: string;
};

export type Project = {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  tags: string[];
};