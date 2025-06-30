import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolveFilePath(fileArg) {
  return fileArg
    ? path.resolve(process.cwd(), fileArg)
    : path.resolve(__dirname, '../cnabExample.rem');
}

export async function readFileAsync(filePath) {
  return readFile(filePath, 'utf8');
}

export function writeFileSync(filePath, data) {
  fs.writeFileSync(filePath, data, 'utf8');
}
