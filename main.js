import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Xác định __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Thư mục chứa các file script
const scriptsDir = path.join(__dirname, 'scripts');

// Lấy tên file cần chạy từ đối số dòng lệnh, mặc định là 'http.js'
const fileName = process.argv[2] || 'http.js';
// Lấy tần suất chạy (lần/giây) từ đối số dòng lệnh, mặc định là 100 lần mỗi giây
const frequency = parseFloat(process.argv[3]) || 100;

const filePath = path.join(scriptsDir, fileName);

// Kiểm tra xem file có tồn tại hay không
if (!fs.existsSync(filePath)) {
  console.error(`Không tìm thấy file ${fileName} trong thư mục ${scriptsDir}`);
  process.exit(1);
}

console.log(`Đang chạy file: ${fileName} với tần suất ${frequency} lần mỗi giây`);

const intervalMs = 1000 / frequency;

// Hàm dynamic import với cache busting
async function runScript() {
  // Chuyển đổi filePath thành URL hợp lệ với scheme file://
  const fileUrl = pathToFileURL(filePath).href;
  // Thêm tham số query dựa vào thời gian để bỏ qua cache
  const moduleUrl = `${fileUrl}?update=${Date.now()}`;
  try {
    await import(moduleUrl);
  } catch (err) {
    console.error(`Lỗi khi chạy file ${fileName}: ${err.message}`);
  }
}

setInterval(runScript, intervalMs);
