import { PAGE_DATA } from "@/constants";
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

type SocialsProps = {
  className?: string;
};

export const Socials: FC<SocialsProps> = ({className}) => {
  return (
    <ul className={cn("flex gap-5 justify-center", className)} aria-label="Social Media">
      {PAGE_DATA.socialLinks.map((social) => {
        return (
          <li key={social.title}>
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
