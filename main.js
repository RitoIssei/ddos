// runner.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// ---- Xác định __dirname ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Cấu hình ----
const scriptsDir = path.join(__dirname, 'scripts');
const fileName = process.argv[2] || 'http.js';
const frequency = parseFloat(process.argv[3]) || 30;
const filePath = path.join(scriptsDir, fileName);

if (!fs.existsSync(filePath)) {
  console.error(`❌ Không tìm thấy file ${fileName}`);
  process.exit(1);
}

console.log(`🚀 Chạy ${fileName} với tần suất ${frequency} lần/giây`);

// ---- Thiết lập require và đường dẫn cache ----
const requireCJS = createRequire(import.meta.url);
const resolvedPath = requireCJS.resolve(filePath);

// ---- Hàm chạy script ----
async function runScript() {
  try {
    // Xóa cache để lần sau require sẽ load lại file
    delete requireCJS.cache[resolvedPath];

    // Load module (module phải export 1 function hoặc default function)
    const mod = requireCJS(filePath);
    const fn = (typeof mod === 'function') ? mod : mod.default;
    if (typeof fn === 'function') {
      await fn();
    } else {
      console.warn('⚠️ Module không export function');
    }

    // Nếu bạn chạy với `node --expose-gc runner.js` thì có thể gọi GC thủ công:
    if (global.gc) global.gc();

  } catch (err) {
    console.error(`❌ Lỗi khi chạy ${fileName}:`, err);
  }
}

// ---- Lên lịch ----
const intervalMs = 1000 / frequency;
setInterval(runScript, intervalMs);
