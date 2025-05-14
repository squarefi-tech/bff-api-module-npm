import 'dotenv/config';
import { exec } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

type ApiDocsData = {
  url: string | undefined;
  name: string;
};

const apiDocsData: ApiDocsData[] = [
  {
    url: process.env.API_V2_URL,
    name: 'apiV2',
  },
];

const generateDocs = async (apiDoc: ApiDocsData) => {
  if (!apiDoc.url) {
    console.error(`${apiDoc.name} URL is not set`);
    process.exit(1);
  }
  const outputPath = resolve(`src/api/types/autogen/${apiDoc.name}.types.ts`);
  const outputDir = dirname(outputPath);

  mkdirSync(outputDir, { recursive: true });

  exec(`npx openapi-typescript "${apiDoc.url}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    writeFileSync(outputPath, stdout);
    console.log(`Types generated at ${outputPath}`);
  });
};

apiDocsData.forEach(generateDocs);
