import * as React from "react";
import { cn } from "../lib/utils";
import {
  TypographyH1,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import { Socials } from "@/components/socials";

export default function Index() {
  return (
    <div className={cn("w-full min-h-screen md:h-screen relative")}>
      <div
        className={cn(
          "mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0"
        )}
      >
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header
            className={cn(
              "lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24"
            )}
          >
            <div>
              <TypographyH1>Joshua Browne</TypographyH1>
              <TypographyH4 className="pt-4">
                Fullstack Developer | Future Software Engineer
              </TypographyH4>
              <TypographyP className="pt-2">
                I build fast, powerful and interesting software
              </TypographyP>
            </div>
            <div>
              <Socials />
            </div>
          </header>
          <main className={cn("w-1/2 md:py-24")}>
            <TypographyP>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
              massa tincidunt dui ut ornare lectus. Dictum non consectetur a
              erat nam. Bibendum enim facilisis gravida neque convallis a cras
              semper auctor. Maecenas ultricies mi eget mauris pharetra. Mi eget
              mauris pharetra et ultrices neque. Ac tortor dignissim convallis
              aenean et tortor at risus.
            </TypographyP>

            <TypographyP>
              Et tortor at risus viverra. Risus feugiat in ante metus dictum at
              tempor commodo ullamcorper. Eu facilisis sed odio morbi quis
              commodo odio aenean sed. Eget lorem dolor sed viverra ipsum nunc
              aliquet. Phasellus egestas tellus rutrum tellus pellentesque eu.
              Ultrices in iaculis nunc sed augue lacus viverra vitae. Nunc
              aliquet bibendum enim facilisis gravida neque. Fames ac turpis
              egestas sed tempus.
              vitae.
            </TypographyP>

            <TypographyP>
              Risus quis varius quam quisque id diam vel quam elementum. Ut diam
              quam nulla porttitor massa id neque aliquam vestibulum.
            </TypographyP>
          </main>
        </div>
      </div>
    </div>
  );
}
