import { Command } from "commander";
import config from "./config";

// generate a site from the markdown documents using quartz
function generate(arg: string, options: any): void {
  // TODO: Implement the logic to generate a Quartz site from Obsidian content
  console.log(`Generating Quartz site with argument: ${arg}`);
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
  .name("autograph-cli")
  .description("AutoGraph CLI to process input files and generate summaries")
  .version("1.0.0");

program
  .command("serve")
  .description("Serve and process an input file locally")
  .argument("<filepath>", "path to the input file")
  .action(serve);

program
  .command("generate")
  .description("Generate a static site from markdown documents")
  .argument("<arg>", "argument used to construct paths and subdomain")
  .action((arg, options) => {
    generate(arg, options);
  });

program
  .command("publish")
  .description("Publish the generated static site")
  .argument("<arg>", "argument used to construct paths and subdomain")
  .action((arg, options) => {
    publish(arg, options);
  });

program.parse(process.argv);
