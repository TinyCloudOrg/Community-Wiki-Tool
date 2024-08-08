import { Command } from "commander";
import { execSync } from "child_process";

import { generateQuartzSite } from "./generate";
import config from "./config";

// generate a site from the markdown documents using quartz
async function generate(): Promise<void> {
  try {
    await generateQuartzSite(config);
    console.log(`Successfully generated Quartz site`);
  } catch (error) {
    console.error(`Failed to generate Quartz site`, error);
  }
}

// serve (locally) the generated site using http-server
function serve(): void {
  const { outputPath } = config;
  try {
    console.log(`Serving the site at path: ${outputPath}`);
    execSync(`http-server ${outputPath}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to serve the site at path: ${outputPath}`, error);
  }
}

// publish the generated site
function publish(arg: string, options: any): void {
  // TODO: Implement the logic to publish a Quartz site from Obsidian content
  console.log(`Publishing Quartz site with argument: ${arg}`);
}

// cli interpreter
const program = new Command();
program
  .name("community-wiki-tool-cli")
  .description(
    "Community Wiki Tool CLI to Generate and Publish the content for the Wiki",
  )
  .version("0.1.0");

program
  .command("generate")
  .description("Generate a static site from existing markdown documents")
  .action(generate);

program
  .command("serve")
  .description("Serve and process an input file locally")
  .action(serve);

program
  .command("publish")
  .description("Publish the generated static site")
  .argument("<arg>", "argument used to construct paths and subdomain")
  .action((arg, options) => {
    publish(arg, options);
  });

program.parse(process.argv);
