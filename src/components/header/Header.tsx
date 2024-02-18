import React from "react"
import { Logo } from "../logo/Logo"
import { Heading } from "../typography"
import { SocialLink, Socials } from "../socials"

export const Header = () => {
    return (
        <header className="fixed w-full flex justify-between pt-10 px-[var(--global-margin-x)] z-50">
            <Logo />
            <div>
                <Heading className="text-end" variant={"headerTitle"}>
                    Software Engineer
                </Heading>
                <Socials className="mt-3 justify-end"/>
            </div>
        </header>
    )
}