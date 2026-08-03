import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgPath = path.join(__dirname, 'package.json');
if (!existsSync(pkgPath)) {
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
console.log(`Backend package ${pkg.name} is ready for deployment.`);
