import { cn } from "@/lib/utils";
import React, { AnchorHTMLAttributes, FC } from "react";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiCredly } from "react-icons/si";

type SocialLink = {
  url: string;
  title: string;
  ariaLabel: string;
  icon: IconType;
};

export const SocialLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  className,
  ...props
}) => {
  return (
    <a
      href={href}
      className={cn(
        "text-muted-foreground hover:text-primary-foreground transition-colors duration-300",
        className
      )}
      target="_blank"
      {...props}
    />
  );
};

export const Socials: FC<{
  socialLinks: SocialLink[];
}> = ({ socialLinks }) => {
  return (
    <ul className="flex" aria-label="Social Media">
      {socialLinks.map((social) => {
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
