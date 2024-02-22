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
                        <Heading variant={"display"} className="whitespace-pre-wrap min-w-[350px]">
                            {myStory.blurb}
                        </Heading>
                    </div>
                    <FakeLink>
                        CONTACT ME
                    </FakeLink>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Heading variant={"small"}>
                        {myStory.title}
                    </Heading>
                    <div>
                        {myStory.column1.map((item) => (
                            <TypographyP key={item} className="mt-3" variant={"body"}>
                                {item}
                            </TypographyP>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    {myStory.column2.map((item, index) => {
                        return (
                            <TypographyP key={item} className={`${index !== 0 ? "mt-3" : ""}`} variant={"body"}>
                                {item}
                            </TypographyP>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}