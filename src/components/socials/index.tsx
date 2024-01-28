import { cn } from "@/lib/utils";
import React, { AnchorHTMLAttributes, FC } from "react";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaInstagram,  } from "react-icons/fa";
import { SiCredly } from "react-icons/si";

const socials: {
  url: string;
  title: string;
  ariaLabel: string;
  icon: IconType;
}[] = [
  {
    url: "https://www.github.com/joshuabrownenz",
    title: "GitHub",
    ariaLabel: "GitHub (opens in a new tab)",
    icon: FaGithub,
  },{
    url : "https://www.linkedin.com/in/joshuabrownenz",
    title: "LinkedIn",
    ariaLabel: "LinkedIn (opens in a new tab)",
    icon: FaLinkedin,
  }, {
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
  }
];

export const SocialLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  className,
  ...props
}) => {
  return (
    <a
      href={href}
      className={cn("text-muted-foreground hover:text-primary-foreground transition-colors duration-300", className)}
      target="_blank"
      {...props}
    />
  );
};

export const Socials = () => {
  return (
    <ul className="flex" aria-label="Social Media">
      {socials.map((social) => {
        return (
          <li key={social.title} className="mr-5">
            <SocialLink
              href={social.url}
              title={social.title}
              aria-label={social.ariaLabel}
            >
              <social.icon className="w-6 h-6" />
            </SocialLink>
          </li>
        );
      })}
    </ul>
  );
};
