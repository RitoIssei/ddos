// runner.js
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const scriptsDir = path.join(__dirname, 'scripts');
const fileName   = process.argv[2] || 'http.js';
const freq       = parseFloat(process.argv[3]) || 30;
const filePath   = path.join(scriptsDir, fileName);

if (!fs.existsSync(filePath)) {
  console.error(`❌ Không tìm thấy ${fileName}`);
  process.exit(1);
}

console.log(`🚀 Chạy ${fileName} @ ${freq} lần/giây`);

const requireCJS   = createRequire(import.meta.url);
const resolvedPath = requireCJS.resolve(filePath);

async function runScript() {
  try {
    // Xóa cache của CommonJS
    delete requireCJS.cache[resolvedPath];

    // Require module (module phải export 1 function)
    const mod = requireCJS(filePath);
    const fn  = typeof mod === 'function' ? mod : mod.default;
    if (typeof fn === 'function') {
      await fn();
    }

    // Nếu chạy Node với --expose-gc, ta có thể ép GC:
    if (global.gc) global.gc();
  } catch (err) {
    console.error(`❌ Lỗi khi chạy ${fileName}:`, err);
  }
}

setInterval(runScript, 1000 / freq);
