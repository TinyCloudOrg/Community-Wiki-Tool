import { Command } from "commander";
import { generateQuartzSite } from "./generate";
import config from "./config";

// generate a site from the markdown documents using quartz
async function generate(arg: string, options: any): Promise<void> {
  try {
    await generateQuartzSite({
      contentPath: "./documents",
      outputPath: "./public",
    });
    console.log(`Successfully generated Quartz site with argument: ${arg}`);
  } catch (error) {
    console.error(`Failed to generate Quartz site with argument: ${arg}`, error);
  }
}

// serve (locally) the generated site
function serve(filepath: string, options: any): void {
  // TODO: Implement the logic to process an input file and generate summaries
  console.log(`Serving and processing file at path: ${filepath}`);
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
  .description("Community Wiki Tool CLI to Generate and Publish the content for the Wiki")
  .version("0.1.0");

program
  .command("generate")
  .description("Generate a static site from existing markdown documents")
  .action(generate);

program
  .command("serve")
  .description("Serve and process an input file locally")
  .argument("<filepath>", "path to the input file")
  .action(serve);

program
  .command("publish")
  .description("Publish the generated static site")
  .argument("<arg>", "argument used to construct paths and subdomain")
  .action((arg, options) => {
    publish(arg, options);
  });

program.parse(process.argv);
