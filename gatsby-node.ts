import { CreateWebpackConfigArgs } from "gatsby";
import * as path from "path"
import fs from "fs"

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        "@/constants": path.resolve(__dirname, "src/constants"),
      },
    },
  })
}

export const onPreBuild = () => {
  if (!fs.existsSync("./static/resume.pdf")) {
    throw new Error("No resume.pdf found in static folder.")
  }
}