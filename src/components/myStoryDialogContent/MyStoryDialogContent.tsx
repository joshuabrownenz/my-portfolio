import React, { FC } from "react"
import { Heading, TypographyP } from "../typography";
import { FakeLink } from "../fakeLink/FakeLink";
import { StaticImage } from "gatsby-plugin-image";
import { PAGE_DATA } from "@/constants";

type MyStoryDialogContentProps = {
    className?: string;
}

export const MyStoryDialogContent: FC<MyStoryDialogContentProps> = ({ className }) => {
    const { myStory } = PAGE_DATA;
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
                            {myStory.blurb}
                        </Heading>
                    </div>
                    <FakeLink>
                        CONTACT ME
                    </FakeLink>
                </div>
                <div className="w-full flex flex-col gap-4 ">
                    <Heading variant={"small"}>
                        {myStory.title}
                    </Heading>
                    <div>
                        <TypographyP variant={"body"}>
                            {myStory.paragraph1}
                        </TypographyP>
                        <TypographyP className="mt-3" variant={"body"}>
                            {myStory.paragraph2}
                        </TypographyP>
                    </div>
                </div>
                <div className="w-full">
                    <TypographyP variant={"body"}>
                        {myStory.paragraph3}
                    </TypographyP>
                    <TypographyP className="mt-3" variant={"body"}>
                        {myStory.paragraph4}
                    </TypographyP>
                    <TypographyP className="mt-3" variant={"body"}>
                        {myStory.paragraph5}
                    </TypographyP>
                    <TypographyP className="mt-3" variant={"body"}>
                        {myStory.paragraph6}
                    </TypographyP>
                </div>
            </div>
        </div>
    )
}