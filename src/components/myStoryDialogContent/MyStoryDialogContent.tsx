import React, { FC } from "react"
import { Heading, Typography } from "../typography";
import { FakeLink } from "../fakeLink/FakeLink";
import { StaticImage } from "gatsby-plugin-image";

type MyStoryDialogContentProps = {
    className?: string;
}

export const MyStoryDialogContent: FC<MyStoryDialogContentProps> = ({className}) => {
    return (
        <div className={className}>
            <Heading variant={"large"}>
                My Story
            </Heading>
            <div className="flex gap-11 min-h-96 mt-6">
                <div className="w-full flex flex-col justify-between">
                    <div className="flex flex-col gap-6">
                        <div>
                            <StaticImage src={"../../images/Headshot.png"} className="rounded-full" width={82} alt={"Headshot of Me"} />
                        </div>
                        <Heading variant={"display"} className="whitespace-pre-wrap">
                            I build fast, powerful{" \n"}and interesting{" \n"}software.
                        </Heading>
                    </div>
                    <FakeLink>
                        CONTACT ME
                    </FakeLink>
                </div>
                <div className="w-full flex flex-col gap-6 ">
                    <Heading variant={"small"}>
                        I'm a fullstack developer and future software engineer based in Auckland, New Zealand.
                    </Heading>
                    <Typography variant={"body"}>
                        I'm currently studying a Bachelor of Computer and Information Sciences at AUT University.I'm currently working as a fullstack developer at a small startup called <a href='https://www.livewirehr.co.nz' target='_blank'>LivewireHR</a>.  I'm also a freelance developer, working with a variety of clients to build websites and web applications. I'm currently working on a few projects, including a new
                    </Typography>
                </div>
                <div className="w-full">
                    <Typography variant={"body"}>
                        I'm currently studying a Bachelor of Computer and Information Sciences at AUT University.I'm currently working as a fullstack developer at a small startup called <a href='https://www.livewirehr.co.nz' target='_blank'>LivewireHR</a>.  I'm also a freelance developer, working with a variety of clients to build websites and web applications. I'm currently working on a few projects, including a new website for a local business, a new website for a local charity, and a new website for a local church.
                    </Typography>
                </div>
            </div>
        </div>
    )
}