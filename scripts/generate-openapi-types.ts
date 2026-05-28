import 'dotenv/config';
import { exec } from 'child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join, resolve } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

type ApiDocsData = {
  url: string | undefined;
  name: string;
};

const apiDocsData: ApiDocsData[] = [
  {
    url: process.env.API_DOCS_V2_URL,
    name: 'apiV2',
  },
  {
    url: process.env.API_DOCS_V1_EXTERNAL_URL,
    name: 'apiV1External',
  },
  {
    url: process.env.API_DOCS_V1_TENANT_URL,
    name: 'apiV1Tenant',
  },
  {
    url: process.env.API_DOCS_V1_FRONTEND_URL,
    name: 'apiV1Frontend',
  },
  {
    url: process.env.API_DOCS_V1_LEGACY_URL,
    name: 'apiV1Legacy',
  },
];

const collectRefs = (node: unknown, out: Set<string>) => {
  if (node === null || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const item of node) collectRefs(item, out);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === '$ref' && typeof value === 'string' && value.startsWith('#/')) {
      out.add(value);
    } else {
      collectRefs(value, out);
    }
  }
};

const resolveRef = (ref: string, root: unknown): unknown => {
  const parts = ref.slice(2).split('/');
  let cur: unknown = root;
  for (const raw of parts) {
    const part = raw.replace(/~1/g, '/').replace(/~0/g, '~');
    if (cur && typeof cur === 'object' && part in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return cur;
};

const ensurePath = (root: Record<string, unknown>, segments: string[]): Record<string, unknown> => {
  let cur: Record<string, unknown> = root;
  for (const segment of segments) {
    if (
      !cur[segment] ||
      typeof cur[segment] !== 'object' ||
      Array.isArray(cur[segment])
    ) {
      cur[segment] = {};
    }
    cur = cur[segment] as Record<string, unknown>;
  }
  return cur;
};

// Inject empty placeholder schemas for any local $refs that don't resolve, so
// openapi-typescript's strict bundler doesn't abort. Returns the count patched.
const patchBrokenRefs = (spec: Record<string, unknown>): number => {
  const refs = new Set<string>();
  collectRefs(spec, refs);
  let patched = 0;
  for (const ref of refs) {
    if (resolveRef(ref, spec) !== undefined) continue;
    const parts = ref.slice(2).split('/');
    if (parts.length === 0) continue;
    const leaf = parts.pop() as string;
    const parent = ensurePath(spec, parts);
    parent[leaf.replace(/~1/g, '/').replace(/~0/g, '~')] = {};
    patched += 1;
  }
  return patched;
};

const fetchSpec = async (url: string): Promise<string> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
};

const generateDocs = async (apiDoc: ApiDocsData) => {
  if (!apiDoc.url) {
    throw new Error(`${apiDoc.name} URL is not set`);
  }
  const outputPath = resolve(`src/api/types/autogen/${apiDoc.name}.types.ts`);
  mkdirSync(dirname(outputPath), { recursive: true });

  const raw = await fetchSpec(apiDoc.url);
  let inputArg = apiDoc.url;
  let tempDir: string | null = null;

  // Only JSON specs are patched; YAML specs are passed through untouched.
  if (apiDoc.url.endsWith('.json') || raw.trimStart().startsWith('{')) {
    try {
      const spec = JSON.parse(raw) as Record<string, unknown>;
      const patched = patchBrokenRefs(spec);
      if (patched > 0) {
        console.log(`[${apiDoc.name}] Patched ${patched} unresolved $ref(s) with empty placeholder schemas`);
      }
      tempDir = mkdtempSync(join(tmpdir(), `${apiDoc.name}-`));
      inputArg = join(tempDir, 'spec.json');
      writeFileSync(inputArg, JSON.stringify(spec));
    } catch (err) {
      if (err instanceof SyntaxError) {
        // Not JSON after all — fall through and let openapi-typescript handle it
      } else {
        throw err;
      }
    }
  }

  try {
    const { stdout, stderr } = await execAsync(
      `npx openapi-typescript "${inputArg}"`,
      { maxBuffer: 50 * 1024 * 1024 },
    );
    if (stderr) {
      console.error(`[${apiDoc.name}] stderr: ${stderr}`);
    }
    writeFileSync(outputPath, stdout);
    console.log(`Types generated at ${outputPath}`);
  } finally {
    if (tempDir) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  }
};

const run = async () => {
  const results = await Promise.allSettled(apiDocsData.map(generateDocs));
  const failures = results
    .map((r, i) => ({ r, name: apiDocsData[i].name }))
    .filter(({ r }) => r.status === 'rejected');
  if (failures.length > 0) {
    for (const { r, name } of failures) {
      console.error(`[${name}] failed:`, (r as PromiseRejectedResult).reason);
    }
    process.exit(1);
  }
};

run();
