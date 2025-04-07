import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Xác định __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Thư mục chứa các file script
const scriptsDir = path.join(__dirname, 'scripts');

// Lấy tên file cần chạy từ đối số dòng lệnh, mặc định là 'http.js'
const fileName  = process.argv[2] || 'http.js';
// Lấy tần suất chạy (lần/giây) từ đối số dòng lệnh, mặc định là 50 lần mỗi giây
const frequency = parseFloat(process.argv[3]) || 50;

const filePath = path.join(scriptsDir, fileName);
if (!fs.existsSync(filePath)) {
  console.error(`Không tìm thấy file ${fileName} trong thư mục ${scriptsDir}`);
  process.exit(1);
}

console.log(`Đang chạy file: ${fileName} với tần suất ${frequency} lần mỗi giây`);

const intervalMs = 1000 / frequency;

// Biến đếm
let totalCount    = 0;
let intervalCount = 0;

// Mỗi 10s log số request trong 10s và tổng từ đầu
setInterval(() => {
  console.log(`📬 Trong 10s vừa rồi: ${intervalCount} request — Tổng từ đầu: ${totalCount} request`);
  intervalCount = 0;
}, 10_000);

// Hàm dynamic import với cache busting
async function runScript() {
  // tăng cả 2 biến đếm
  intervalCount++;
  totalCount++;

  // Chuyển đổi filePath thành URL file:// và bust cache
  const fileUrl   = pathToFileURL(filePath).href;
  const moduleUrl = `${fileUrl}?update=${Date.now()}`;

  try {
    await import(moduleUrl);
  } catch (err) {
    console.error(`Lỗi khi chạy file ${fileName}: ${err.message}`);
  }
}

// Khởi chạy theo tần suất
setInterval(runScript, intervalMs);
