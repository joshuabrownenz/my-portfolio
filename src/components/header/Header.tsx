import React from "react"
import { Logo } from "../logo/Logo"
import { Heading } from "../typography"
import { SocialLink, Socials } from "../socials"

export const Header = () => {
    return (
        <header className="flex justify-between mt-10 mx-[var(--global-margin-x)]">
            <Logo />
            <div>
                <Heading className="text-end" variant={"headerTitle"}>
                    Software Engineer
                </Heading>
                <Heading className="text-end" variant={"headerTitle"}>
                    Full Stack Developer
                </Heading>
                <Socials className="mt-3 justify-end"/>
            </div>
        </header>
    )
}