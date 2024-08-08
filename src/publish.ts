import { spawn } from 'child_process';
import fs from 'fs';

interface PublishConfig {
  outputPath: string;
  subdomain: string;
  cfSuffix: string;
};

// Function to execute wrangler command
const executeWrangler = (args: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const wrangler = spawn('npx', ['wrangler', ...args], { stdio: 'inherit' });

    wrangler.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Wrangler exited with code ${code}`));
      }
    });

    wrangler.on('error', (err) => {
      reject(err);
    });
  });
};

// Function to check if a project exists
const projectExists = (projectName: string): Promise<boolean> => {
  return new Promise((resolve) => {
    executeWrangler(['pages', 'project', 'get', projectName])
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
};

// Main publish function
export async function publishToCloudflarePages(config: PublishConfig) {
    const { outputPath, subdomain, cfSuffix } = config;
    const projectName: string = `${subdomain}${cfSuffix}`;
    
    // Check if the site directory exists
    if (!fs.existsSync(outputPath)) {
      console.error(`Site directory not found: ${outputPath}`);
      process.exit(1);
    }
    
  try {
    console.log(`Publishing site for '${subdomain}' to Cloudflare Pages...`);

    const exists = await projectExists(projectName);

    if (exists) {
      console.log(`Project ${projectName} already exists. Updating...`);
    } else {
      console.log(`Creating new project: ${projectName}`);
    }

    await executeWrangler(['pages', 'deploy', outputPath, '--project-name', projectName]);

    console.log(`Site for '${subdomain}' has been successfully published to Cloudflare Pages.`);
    console.log(`You can view your site at https://${projectName}.pages.dev`);
  } catch (error) {
    console.error('Error publishing to Cloudflare Pages:', error);
    process.exit(1);
  }
}
