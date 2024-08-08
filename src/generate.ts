import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

/**
 * Configuration interface for Quartz site generation.
 * @interface QuartzConfig
 * @property {string} contentPath - Path to the Obsidian content directory.
 * @property {string} outputPath - Path where the generated Quartz site will be saved.
 */
interface QuartzConfig {
  contentPath: string;
  outputPath: string;
}

/**
 * Generates a Quartz site from Obsidian content.
 * @async
 * @function generateQuartzSite
 * @param {QuartzConfig} config - Configuration object for site generation.
 * @param {string} config.contentPath - Path to the Obsidian content directory.
 * @param {string} config.outputPath - Path where the generated Quartz site will be saved.
 * @throws Will throw an error if the Quartz submodule is not found or if any step in the process fails.
 * @returns {Promise<void>}
 */
async function generateQuartzSite({ contentPath, outputPath }: QuartzConfig): Promise<void> {
  try {
    // Ensure Quartz submodule exists
    const projectRoot = process.cwd();
    const quartzPath = path.join(projectRoot, 'quartz');
    if (!fs.existsSync(quartzPath)) {
      throw new Error('Quartz submodule not found. Please initialize and update Git submodules.');
    }

    // Clean the Quartz content directory
    const quartzContentPath = path.join(quartzPath, 'content');
    console.log('Cleaning Quartz content directory...');
    await fs.emptyDir(quartzContentPath);

    // Copy Obsidian content to Quartz content directory
    console.log('Copying new content...');
    await fs.copy(contentPath, quartzContentPath);

    // Build Quartz site
    console.log('Building Quartz site...');
    execSync('npx quartz build', { cwd: quartzPath, stdio: 'inherit' });

    // Clean the output directory
    console.log('Cleaning output directory...');
    await fs.emptyDir(outputPath);

    // Copy built site to output directory
    console.log('Copying built site to output directory...');
    const builtSitePath = path.join(quartzPath, 'public');
    await fs.copy(builtSitePath, outputPath);

  } catch (error) {
    console.error('Error generating Quartz site:', error);
    process.exit(1);
  }
}

export { generateQuartzSite };